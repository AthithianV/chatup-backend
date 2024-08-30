import { NextFunction, Request, Response } from "express";
import PrivateChatRepository from "./repository";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import { consoleLogger, logger } from "../../utils/logger";
import { User } from "../../types/user";


export default class PrivateChatController{
    chatRepository;
    constructor(){
        this.chatRepository = new PrivateChatRepository();
    }

    createChat = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void> => {
        try {

            
            const userId1 = req.user.userId;
            const userId2 = req.params.userId;



            const users = await this.chatRepository.createChat(userId1, userId2);

            const message = `New chat between ${users.user1} and ${users.user2} is created Successfully`
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({success:true, message});

        } catch (error) {
            next(error);
        }
    }

    getChatHistory = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        try {
            const chatId = req.params.chatId;
            let page:number;
            let limit:number;
            if(!req.query){
                page = 0;
                limit = 20;
            }else{
                page = Number(req.query.page);
                limit = Number(req.query.limit);    
            }
            const chat = await this.chatRepository.getChatMessages(chatId, page, limit);

            const message = `Chat history of ${chat.participants[0]} and ${chat.participants[1]} is sent Successfully`
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({chatId: chat._id, messages: chat.messages});

        } catch (error) {
            next(error);
        }
    }

    getAllChats = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
        try {
            
            const userId = req.params.userId;

            const user:User = await this.chatRepository.getAllChats(userId);

            const message = `All Chat  of ${user.username} is sent Successfully`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json(user);

        } catch (error) {
            next(error);
        }
    }
}