import { NextFunction, Request, Response } from "express";
import PresenceRepository from "./repository";
import { consoleLogger, logger } from "../../utils/logger";

export default class PresenceController {

    presenceRepository:PresenceRepository;
    constructor(presenceRepository:PresenceRepository) {
        this.presenceRepository = new PresenceRepository();
    }
    
    async updateStatus(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const userId:string = req.query.userId as string;
            const status:string = req.query.status as string;
            await this.presenceRepository.updateStatus(userId, status);
            res.status(201).json({success:true, message:`user:${userId} is now ${status}`})
        } catch (error) {
            throw error;
        }
    }

    async getUserStatus(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const userId:string = req.params.userId as string;
            const status = await this.presenceRepository.getUserStatus(userId);
            const message = `User:${userId} is ${status?"Online":"Offline"}`;
            consoleLogger.info(message);
            logger.info(message);
            res.status(200).json({success: true, online: status, message});
        } catch (error) {
            throw error;
        }
    }    

}


















