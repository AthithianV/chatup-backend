import mongoose from "mongoose";
import ApplicationError, { missingError } from "../../middlewares/errorHandler";
import { PrivateChatDocument } from "../../types/chat";
import { GroupChatDocument } from "../../types/group";
import { Message, MessageDocument } from "../../types/message";
import privateChatModel from "../chat/schema";
import groupChatModel from "../group/schema";
import UserRepository from "../user/repository";
import messageModel from "./schema";

export default class MessageRepository {

    static getMessageById = async (messageId:string):Promise<MessageDocument> => {
        const messageDoc:MessageDocument|null = await messageModel.findById(messageId);
        if(!messageDoc){
            throw missingError('Message', messageId);
        }
        return messageDoc;
    }
    
    async sendMessage(userId:string, chatId:string, chatType:string, message:Message){
        try {
            await UserRepository.getUserById(userId);
            let chat:PrivateChatDocument|GroupChatDocument|null;
            if(chatType === 'group'){
                chat = await groupChatModel.findById(chatId);
            }else if(chatType === 'private'){
                chat = await privateChatModel.findById(chatId);
            } else{
                throw new ApplicationError(400, "Chat Type can either be 'Group' or 'Private'")
            }
            if(!chat){
                throw missingError('Chat', chatId);
            }

            const messageDoc:MessageDocument = await messageModel.create({...message, sender: userId, chatId, chatType});
            chat.messages.push(messageDoc._id as mongoose.Types.ObjectId);
            await chat.save();
        } catch (error) {
            throw error;
        }
    }

    async editMessage(messageId:string, userId:string, message:Message){
        try {
            if(message.messageType !== 'text'){
                throw new ApplicationError(400, "Id of the media is Required");
            }
            const messageDoc = await MessageRepository.getMessageById(messageId);
            if(!messageDoc.sender.equals(new mongoose.Types.ObjectId(userId))){
                throw new ApplicationError(400, `Only the sender can edit the message`);
            }
            await messageModel.findByIdAndUpdate(messageId, {...message, updateAt: new Date()});
        } catch (error) {
            throw error;
        }
    }  
    
    async deleteMessage(messageId:string){
        try {
            const message:MessageDocument|null = await messageModel.findByIdAndDelete(messageId);
            if(!message){
                throw missingError('Message', messageId);
            }
            if(message.chatType === 'group'){
                await groupChatModel.updateOne({_id: message.chatId}, {"$pull": {messages: message._id}});
            }else if(message.chatType === 'private'){
                await privateChatModel.updateOne({_id: message.chatId}, {"$pull": {messages: message._id}});
            }
        } catch (error) {
            throw error;
        }
    }  
}
