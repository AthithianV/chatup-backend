import { NextFunction, Response } from "express";

import { AuthorizedRequest } from "../../types/authorizedRequest";
import MediaRepository from "./repository";
import ApplicationError from "../../middlewares/errorHandler";
import { consoleLogger, logger } from "../../utils/logger";


export default class MediaController{
    mediaRepository:MediaRepository;
    constructor(){
        this.mediaRepository = new MediaRepository();
    }

    uploadMedia = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            if(!req.files){
                throw new ApplicationError(400, "Files not attached");
            }

            const mediaType = req.params.mediaType;
            const mediaId = await this.mediaRepository.uploadMedia(req.files as Express.Multer.File[], mediaType);
            
            console.log("response");
            
            res.status(201).json(
                {
                    success: true,
                    mediaId
                }
            )
        } catch (error) {
            next(error);
        }
    }
    
    deleteMedia = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const mediaId = req.params.mediaId;
            await this.mediaRepository.deleteMedia(mediaId);
            const message = `Media:${mediaId} is deleted Successfull`;
            
            consoleLogger.info(message);
            logger.info(message);
            
            res.status(200).json({
                success: true,
                message
            })
        } catch (error) {
            next(error);
        }
    }
}