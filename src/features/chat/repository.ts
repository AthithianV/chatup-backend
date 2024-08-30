import mongoose from "mongoose";
import ApplicationError, { missingError } from "../../middlewares/errorHandler";
import { PrivateChatDocument } from "../../types/chat";
import { UserDocument } from "../../types/user";
import userModel from "../user/schema"
import privateChatModel from "./schema";
import UserRepository from "../user/repository";

export default class PrivateChatRepository{
    createChat = async (userId1:string, userId2:string):Promise<{user1:string, user2:string}> => {
        try {
            if(userId1 === userId2){
                throw new ApplicationError(400, "User cannot create chat with themself");
            }

            const user1:UserDocument = await UserRepository.getUserById(userId1);
            const user2:UserDocument = await UserRepository.getUserById(userId2);

            const chatExists = await privateChatModel.findOne({participants: {"$all": [userId1, userId1]}});
            if(chatExists){
                throw new ApplicationError(400, `Chat alreay exists between ${user1.username} and ${user2.username}`)
            }
            
            const session = await mongoose.startSession();
            session.startTransaction();
            try{
                const chat = await privateChatModel.create({participants: [user1._id, user2._id]});
                user1.privateChats.push(chat._id);
                user2.privateChats.push(chat._id);
                await user1.save();
                await user2.save();
                session.commitTransaction();
            }catch(err){
                session.abortTransaction();
                throw err;
            }finally{
                session.endSession();
                return {user1: user1.username, user2: user2.username};
            }
       
        } catch (error) {
            throw error;
        }
    }

    getChatMessages = async (chatId:string, page:number, limit:number):Promise<PrivateChatDocument> => {
        try {
            const chat = await privateChatModel.findById(chatId)
            .populate({
                path: 'messages',
                populate: {
                    path: 'replyToMessageId'
                },
                options: {
                    sort: {createdAt: -1},
                    limit: limit,
                    skip: (page-1)*limit
                }
            })
            .exec();
            if(!chat){
                throw missingError('Chat', chatId);
            }
            return chat;
        } catch (error) {
            throw error;
        }
    }

    getAllChats = async (userId:string):Promise<UserDocument> => {
        try {
            let user:UserDocument|null = await userModel.findById(userId).select("privateChats username _id");
            if(!user){
                throw missingError('User', userId);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}