import { PrivateChat } from "../../types/chat";
import { GroupChat } from "../../types/group";
import { Message } from "../../types/message";
import privateChatModel from "../chat/schema";
import groupChatModel from "../group/schema";
import messageModel from "../message/schema";

export default class SearchRepository {
    
    async searchMessage(userId:string, searchKey:string, page:number, limit:number):Promise<Message[]>{
        try {
            const messages = await messageModel
            .find({userId, content: {"$regex": new RegExp(searchKey)}})
            .sort({createdAt: -1})
            .limit(limit)
            .skip((page-1)*limit);

            return messages;
        } catch (error) {
            throw error;
        }
    }

    async searchChat(userId:string, searchKey:string, page:number, limit:number):Promise<(PrivateChat|GroupChat)[]>{
        try {
            const privateChats = await privateChatModel
                .find({userId, content: {"$regex": new RegExp(searchKey)}})
                .sort({createdAt: -1})
                .limit(limit)
                .skip((page-1)*limit);
            const groupChats = await groupChatModel
                .find({userId, name: {"$regex": new RegExp(searchKey)}})
                .sort({createdAt: -1})
                .limit(limit)
                .skip((page-1)*limit);
            
            const chats = [...privateChats, ...groupChats].sort((c1, c2)=> {
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
