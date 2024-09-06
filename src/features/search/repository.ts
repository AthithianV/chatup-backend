import { populate } from "dotenv";
import ApplicationError from "../../middlewares/errorHandler";
import { PrivateChat } from "../../types/chat";
import { GroupChat } from "../../types/group";
import { Message } from "../../types/message";
import privateChatModel from "../chat/schema";
import groupChatModel from "../group/schema";
import messageModel from "../message/schema";
import userModel from "../user/schema";
import { User } from "../../types/user";

export default class SearchRepository {
    
    async searchMessage(userId:string, searchKey:string, page:number, limit:number):Promise<Message[]>{
        try {
            if(page<1){
                throw new ApplicationError(400, "Page number must be greater than 1");
            }
            if(limit<0){
                throw new ApplicationError(400, "Page number must be greater than 0");
            }
            
            const messages = await messageModel
            .find({sender: userId, content: {"$regex": new RegExp(searchKey)}})
            .sort({createdAt: -1})
            .limit(limit)
            .skip((page-1)*limit).exec();

            return messages;
        } catch (error) {
            throw error;
        }
    }

    async searchUser(searchKey:string, page:number, limit:number):Promise<User[]>{
        try {
            if(page<1){
                throw new ApplicationError(400, "Page number must be greater than 1");
            }
            if(limit<0){
                throw new ApplicationError(400, "Page number must be greater than 0");
            }
            
            const users = await userModel
            .find({username: {"$regex": new RegExp(searchKey)}})
            .select("_id username email profilePicture lastActive status online")
            .sort({createdAt: -1})
            .limit(limit)
            .skip((page-1)*limit).exec();

            return users;
        } catch (error) {
            throw error;
        }
    }



    async searchChat(userId:string, searchKey:string, page:number, limit:number):Promise<(PrivateChat|GroupChat)[]>{
        try {

            

            // let userPrivateChats = await userModel.findById(userId)
            //     .select("privateChats username")
            //     .populate({
            //         path: "privateChats",
            //         select: "participants",  
            //     })
            //     .exec();

            

            // const privateChats = await privateChatModel
            //     .find({userId, content: {"$regex": new RegExp(searchKey)}})
            //     .sort({createdAt: -1})
            //     .limit(limit)
            //     .skip((page-1)*limit)
            //     .exec();
            const groupChats = await groupChatModel
                .find({userId, name: {"$regex": new RegExp(searchKey)}})
                .sort({createdAt: -1})
                .limit(limit)
                .skip((page-1)*limit)
                .exec();
            
            const chats = groupChats.sort((c1, c2)=> {
                if(c1.updatedAt>c2.updatedAt){
                    return -1;
                }else if(c1.updatedAt>c2.updatedAt){
                    return 1;
                }else{
                    return 0;
                }
            })

            return chats;
        } catch (error) {
            throw error;
        }
    }

}
