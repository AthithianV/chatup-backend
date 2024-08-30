import mongoose from "mongoose";

import ApplicationError, { missingError } from "../../middlewares/errorHandler";
import { SensitiveUser, UserDocument } from "../../types/user";
import compressImage from "../../utils/compressImage";
import userModel from "./schema";
import generateRandomNumber from "../../utils/gererateRandomNumber";
import {Otp, OtpDocument} from "../../types/otp";
import sendEmail from "../../utils/mailer";
import otpModel from "../auth/otpSchema";
import { deleteFile } from "../../utils/deleteFile";
import groupChatModel from "../group/schema";


export default class UserRepository {

    static getUserById = async (userId:string|mongoose.Types.ObjectId):Promise<UserDocument>=>{
        const user:UserDocument|null = await userModel.findById(userId);
        if(!user){
            throw new ApplicationError(400, `User Not found for userId: ${userId}`);
        }
        return user;
    } 

    
    
    getUserProfile = async (userId:string):Promise<SensitiveUser> => {
        try {
            const user:SensitiveUser|null = await userModel.findById(userId).select("_id username email profilePicture status lastActive online");
            if(!user){
                throw missingError("User", userId);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    updateProfilePicture = async (filename:string, userId:string) => {
        try {
            const basePath = "./uploads/profile";
            const originalPath = `/original/${filename}`;
            const compressedPath = `/compressed/${filename}`;

            const user:UserDocument = await UserRepository.getUserById(userId);
            if(user.profilePicture){
                deleteFile(basePath+user.profilePicture.original);
                deleteFile(basePath+user.profilePicture.compressed);
            }


            await compressImage(basePath+originalPath, basePath+compressedPath);

            
            user.profilePicture = {
                original: `/profile/original/${filename}`, 
                compressed: `/profile/compressed/${filename}`
            };
            user.updatedAt = new Date();
            await user.save();

        } catch (error) {
            throw error;
        }
    }

    
    updateStatus = async (userId:string, status:string) => {
        try {
            const user:UserDocument = await UserRepository.getUserById(userId);
            user.status = status;
            user.updatedAt = new Date();
            await user.save();
        } catch (error) {
            throw error;
        }
    }

    toggleOnline = async (userId:string):Promise<boolean> => {
        try {
            
            const user:UserDocument = await UserRepository.getUserById(userId);
            user.online = !user.online;
            user.updatedAt = new Date();
            await user.save();
            return user.online;
        } catch (error) {
            throw error;
        }
    }

    addContact = async (userId:string, newcontactId:string):Promise<string>=> {
        try {
            const newContact:UserDocument = await UserRepository.getUserById(newcontactId);
            const user:UserDocument = await UserRepository.getUserById(userId);

            const contactAlrearyExists = user.contacts.find((id)=>id.equals(newContact._id as mongoose.Types.ObjectId));

            if(contactAlrearyExists){
                throw new ApplicationError(400, `${newContact.username} is already in the contact list of ${user.username}`);
            }

            user.contacts.push(newContact._id as mongoose.Types.ObjectId);
            user.updatedAt = new Date();
            await user.save();
            return newContact.username;
        } catch (error) {
            throw error;
        }
    }

    getContacts = async (userId:string):Promise<mongoose.Types.ObjectId[]> => {
        try {
            const user:UserDocument = (await UserRepository.getUserById(userId));
            const list = await user.populate(
                "contacts",
                [
                    "_id",
                    "username", 
                    "email", 
                    "profilePicture",
                    "status",
                    "lastActive",
                    "online"
                ]
            );
            return user.contacts;
        } catch (error) {
            throw error;
        }
    }

    blockUser = async (userId:string, blockUserId:string):Promise<String> => {
        try {
            const blockUser:UserDocument = await UserRepository.getUserById(blockUserId);
            const user:UserDocument|null = await UserRepository.getUserById(userId);

            const userAlreadyBlocked = user.blockedUsers.find((id)=>id.equals(blockUser._id as mongoose.Types.ObjectId));
            if(userAlreadyBlocked){
                throw new ApplicationError(400, `${blockUser.username} is already blocked by ${user.username}`);
            }

            user.blockedUsers.push(blockUser._id as mongoose.Types.ObjectId);
            user.updatedAt = new Date();
            await user.save();
            return blockUser.username;
        } catch (error) {
            throw error;
        }
    }

    leaveGroup = async (userId:string, groupId:string) => {
        const session = await mongoose.startSession();
            session.startTransaction();
            try {
                
                const user = await userModel.findByIdAndUpdate({_id: userId}, {"$pull": {groups: groupId} });
                if(!user){
                    throw missingError("User", userId);
                }
                const group = await groupChatModel.findByIdAndUpdate({_id: groupId}, {"$pull": {participants: userId}});
                if(!group){
                    throw missingError("Group", groupId);
                }
                
            } catch (error) {
                session.abortTransaction();
                console.log(error);
                throw error;
            }finally{
                session.endSession();
            }
        
    }

    verifyEmail = async (email:string):Promise<Otp> => {
        try {
            const otp = generateRandomNumber(1000, 9999);
            const newOtp:Otp = {email, otp, expiry: new Date(Date.now()+15*60*1000), verified: false, createdAt: new Date()};

            await sendEmail(email, "OTP for Email Verification - Chatup", `The OTP for the email Verification is ${otp}`);
            await otpModel.create(newOtp);

            return newOtp;
        } catch (error) {
            throw error;
        }
    }

    confirmEmail = async (email:string, otp:string) => {
        try {
            const otpRecord:OtpDocument|null = await otpModel.findOne({email, otp});
            if(!otpRecord || otpRecord.expiry <new Date()){
                throw new ApplicationError(400, "Invalid OTP");
            }

            const user:UserDocument|null = await userModel.findOne({email});

            if(!user){
                throw missingError("User", email);
                
            }

            user.emailVerified = true;
            user.updatedAt = new Date();

            const session = await mongoose.startSession();
            session.startTransaction();
            try{
                await user.save();
                await otpModel.deleteMany({email});
            }catch(err){
                session.abortTransaction();
                throw err;
            }finally{
                session.endSession();
            }

        } catch (error) {
            throw error;
        }
    }
}