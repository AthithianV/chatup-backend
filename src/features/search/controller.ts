import { NextFunction, Request, Response } from "express";
import MessageRepository from "./repository";

export default class MessageController {
    messageRepository:MessageRepository;
    constructor() {
        this.messageRepository = new MessageRepository();
    }

    async add(req:Request, res:Response, next:NextFunction){
        try {
            const message = req.body;
            
        } catch (error) {
            next(error);
        }
    }

}


















