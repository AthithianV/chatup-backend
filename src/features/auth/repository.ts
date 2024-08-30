import ApplicationError from "../../middlewares/errorHandler";
import { RegisterUser, User, UserDocument } from "../../types/user";
import sendEmail from "../../utils/mailer";
import userModel from "../user/schema";
import bcrypt from "bcrypt";
import otpModel from "./otpSchema";
import {Otp, OtpDocument} from "../../types/otp";
import generateRandomNumber from "../../utils/gererateRandomNumber";
import mongoose from "mongoose";


export default class AuthRepository{

    register = async (user:RegisterUser):Promise<User>=> {
        try {
    
            // Check for existence of username.
            const isUsernameExists:UserDocument|null = await userModel.findOne({username: user.username});
            if(isUsernameExists){
                throw new ApplicationError(400, "Username already Exists");
            }
    
            // Check for existence of Email.
            const isEmailCheckExists:UserDocument|null = await userModel.findOne({email: user.email});
            if(isEmailCheckExists){
                throw new ApplicationError(400, "Email Id already Exists");
            }
    
            user.password = await bcrypt.hash(user.password, 10);
    
            const newUser = new userModel(user);
            await newUser.save();
    
            return newUser;
    
        } catch (err:any) {
            if(err.code === 11000){
                if(err.keyPattern.username){
                    throw new ApplicationError(400, "Username already Exists");
                }else if(err.keyPattern.email){
                    throw new ApplicationError(400, "Email already Exists");
                }
            }else if(err.code == 400){
                throw err;
            }

            throw err;
            
        }
    }
    
    login = async (user:User):Promise<User> => {
        try {
            const loginErr = new ApplicationError(400, "Username or Password incorrect");
            const foundUser:UserDocument|null = await userModel.findOne({email: user.email});
            if(!foundUser){
                throw loginErr;
            }
            const checkPassword = await bcrypt.compare(user.password, foundUser.password);
            if(!checkPassword){
                throw loginErr;
            }
            return foundUser;
        } catch (error) {
            throw error;
        }
    }
    
    forgetPasword = async (email:string):Promise<Otp> => {
        try {
            const otp = generateRandomNumber(1000, 9999);
            const newOtp:Otp = {email, otp, expiry: new Date(Date.now()+15*60*1000), verified: false, createdAt: new Date()};

            await sendEmail(email, "OTP for Password Reset", `The OTP for the password reset is ${otp}`);
            await otpModel.create(newOtp);

            return newOtp;
        } catch (error) {
            throw error;
        }
    }
    
    verifyOtp = async (email:string, otp:number):Promise<void> => {
        try {
            const record:OtpDocument[]|null = await otpModel.find({email}).sort({createdAt: -1}).limit(1);

            if(record.length === 0 || record[0].otp !== otp){
                throw new ApplicationError(400, "Invalid OTP");
            } else if(record[0].expiry < new Date()){
                throw new ApplicationError(400, "OTP Expired");
            }

            record[0].verified = true;
            await record[0].save();
        } catch (error) {
            throw error;
        }
    }

    resetPassword = async (email:string, password:string):Promise<void> => {
        try {

            const otp:OtpDocument[]|null = await otpModel.find({email}).sort({createdAt: -1}).limit(1);
            
            if(!otp || !otp[0].verified){
                throw new ApplicationError(400, "OTP is not verified");
            }
            
            let user = await userModel.findOne({email});
            if(!user){
                throw new ApplicationError(400, "Invalid email ID");
            }

            const samePassword = await bcrypt.compare(password, user.password);

            if(samePassword){
                throw new ApplicationError(400, "Old and New Password cannot be same");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            user.password = hashedPassword;
            user.updatedAt = new Date();

            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                await user.save();
                await otpModel.deleteMany({email});
                await session.commitTransaction();
            } catch (error) {
                await session.abortTransaction();
                throw error;
            }finally{
                session.endSession();
            }
        } catch (error) {
            throw error;
        }
    }
}


