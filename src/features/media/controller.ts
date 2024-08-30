import { NextFunction, Response } from "express";

import { AuthorizedRequest } from "../../types/authorizedRequest";
import MediaRepository from "./repository";


export default class MediaController{
    mediaRepository:MediaRepository;
    constructor(){
        this.mediaRepository = new MediaRepository();
    }

    uploadFile = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    
    deleteFile = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}