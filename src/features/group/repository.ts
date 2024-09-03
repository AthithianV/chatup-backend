import mongoose, { Mongoose } from "mongoose";
import { GroupChatDocument, GroupChatRequest, UpdateGroupRequest } from "../../types/group";
import groupChatModel from "./schema";
import ApplicationError, { missingError } from "../../middlewares/errorHandler";
import { UserDocument } from "../../types/user";
import userModel from "../user/schema";
import compressImage from "../../utils/compressImage";
import { deleteFile } from "../../utils/deleteFile";
import UserRepository from "../user/repository";


export default class GroupChatRepository{

    static getGroupById = async(groupId:string):Promise<GroupChatDocument>=>{
        
        const group = await groupChatModel.findById(groupId);
        if(!group){
            throw missingError("Group", groupId);
        }

        return group;
    }

    groupAdminCheck = async(userId:string, groupId:string):Promise<void> => {
        const group = await groupChatModel.findById(groupId);
        if(!group){
            throw missingError("Group", groupId);
        }
        
        if(!group.groupAdmin.equals(new mongoose.Types.ObjectId(userId))){
            throw new ApplicationError(400, `Only admin used can perform this action`);
        }
    }

    createGroup = async (userId:string, groupData:GroupChatRequest):Promise<void> =>{
        try {
            groupData.groupAdmin = userId;
            
            if(groupData.participants.indexOf(userId)==-1){
                groupData.participants.push(userId);
            }

            if(groupData.participants.length<3){
                throw new ApplicationError(400, "Group must conatin at least 3 members");
            }
            
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                
                const group = await groupChatModel.create(groupData);

                for(const userId of groupData.participants){
                    const user:UserDocument = await UserRepository.getUserById(userId);
                    user.groups.push(group._id);
                    await user.save();
                }
            } catch (error) {
                session.abortTransaction();
                console.log(error);
                throw error;
            }finally{
                session.endSession();
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    updateGroup = async (groupId:string, update:UpdateGroupRequest):Promise<void> =>{
        try {
            const group = await groupChatModel.findOneAndUpdate({_id:groupId}, {...update, updatedAt: new Date()});

            if(!group){
                throw missingError("Group", groupId);
            }
        } catch (error) {
            throw error;
        }
    }

    updateGroupIcon = async (groupId:string, filename:string, userId:string):Promise<void> =>{
        try {
            const originalPath = `/original/${filename}`;
            const compressedPath = `/compressed/${filename}`;
            const basePath = "./public/uploads/groupIcon";

            const group:GroupChatDocument = await GroupChatRepository.getGroupById(groupId);
            if(!group){
                deleteFile(basePath+originalPath);
                throw missingError("Group", groupId);
            }

            if(!group.groupAdmin.equals(new mongoose.Types.ObjectId(userId))){
                deleteFile(basePath+originalPath);
                throw new ApplicationError(400, "Only group Admin can update group Icon");
            }

            if(group.icon){
                deleteFile(basePath+group.icon.original);
                deleteFile(basePath+group.icon.compressed);
            }

            await compressImage(basePath+originalPath, basePath+compressedPath);
            const icon = {
                original: originalPath,
                compressed: compressedPath
            };
            await groupChatModel.findOneAndUpdate({_id:groupId}, {icon, updatedAt: new Date()});
        } catch (error) {
            throw error;
        }
    }

    deleteGroup = async (groupId:string):Promise<void> =>{
        try {
            const group:GroupChatDocument = await GroupChatRepository.getGroupById(groupId);

            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                await groupChatModel.deleteOne({_id: groupId});
                group.participants.forEach(async (userId)=>{
                    const user:UserDocument|null = await userModel.findByIdAndUpdate(userId, {"$pull": {groups:groupId}});
                });
            } catch (error) {
                session.abortTransaction();
                throw error;
            }finally{
                session.endSession();
            }
        } catch (error) {
            throw error;
        }
    }

    getGroupMembers = async (groupId:string):Promise<GroupChatDocument>=>{
        try {
            const group = await groupChatModel.findById(groupId)
            .select("participants _id")
            .populate({
                path: "participants",
                select: "_id username email profilePicture status lastActive online"
            })
            if(!group){
                throw missingError("Group", groupId);
            }
            return group;
        } catch (error) {
            throw error;
        }
    }

    getGroupMessages = async (groupId:string, page:number, limit: number):Promise<GroupChatDocument>=>{
        try {
            const group = await groupChatModel.findById(groupId)
            .select("messages _id")
            .populate({
                path: "messages",
                populate: [
                    {
                        path: "sender",
                        select: "_id username profilePicture",
                    },
                    {
                        path: 'replyToMessageId'
                    }
                ],
                options: {
                    sort: {createdAt: -1},
                    limit: limit,
                    skip: (page-1)*limit
                }
            })
            if(!group){
                throw missingError("Group", groupId);
            }
            return group;
        } catch (error) {
            throw error;
        }
    }

    addUserToGroup = async (groupId:string, userId:string) =>{
        try {
            const group = await groupChatModel.findByIdAndUpdate(groupId, {
                "$push": {"participants": userId},
                updatedAt: new Date()
            });
            if(!group){
                throw missingError("Group", groupId);
            }
        } catch (error) {
            throw error;
        }
    }

    removeUserFromGroup = async (groupId:string, userId:string) =>{
        try {
            console.log(groupId);
            
            const group:GroupChatDocument = await GroupChatRepository.getGroupById(groupId);

            if(group.participants.length === 3){
                throw new ApplicationError(400, "Group must have at least 3 members")
            }
            await groupChatModel.updateOne({_id: groupId}, {
                "$pull": {"participants": userId},
                updatedAt: new Date()
            });

        } catch (error) {
            throw error;
        }
    }
}