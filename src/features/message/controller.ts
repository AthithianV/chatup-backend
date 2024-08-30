import { NextFunction, Response } from "express";
import MessageRepository from "./repository";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import { Message } from "../../types/message";
import ApplicationError from "../../middlewares/errorHandler";
import { consoleLogger, logger } from "../../utils/logger";

export default class MessageController {
    messageRepository:MessageRepository;
    constructor() {
        this.messageRepository = new MessageRepository();
    }

    
    async sendMessage(req:AuthorizedRequest, res:Response, next:NextFunction){
        try {
            const userId = req.user.userId;
            const chatType = req.query.chatType as string;
            if(!chatType){
                throw new ApplicationError(400, "Chat type is required");
            }
            const chatId = req.query.chatId as string;
            if(!chatId){
                throw new ApplicationError(400, "Chat ID is required");
            }
            const message:Message = req.body;
            await this.messageRepository.sendMessage(userId, chatId, chatType, message);
            const resMessage = `New message is sent to ${chatType} with id ${chatId}`;
            consoleLogger.info(resMessage);
            logger.info(resMessage);
            res.status(200).json({success: true, message: resMessage});
        } catch (error) {
            next(error);
        }
    }

    async editMessage(req:AuthorizedRequest, res:Response, next:NextFunction){
        try {
            const messageId = req.params.messageId;
            const userId = req.user.userId;
            const message = req.body;
            await this.messageRepository.editMessage(messageId, userId, message);
            const resMessage = `Message:${messageId} is updated`;
            consoleLogger.info(resMessage);
            logger.info(resMessage);
            res.status(200).json({success: true, message: resMessage});
        } catch (error) {
            next(error);
        }
    }  
    
    async deleteMessage(req:AuthorizedRequest, res:Response, next:NextFunction){
        try {
            const messageId = req.params.messageId;
            await this.messageRepository.deleteMessage(messageId);
            const resMessage = `Message:${messageId} is deleted successfully`;
            consoleLogger.info(resMessage);
            logger.info(resMessage);
            res.status(200).json({success: true, message: resMessage});
        } catch (error) {
            next(error);
        }
    }  

}


















