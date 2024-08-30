import { NextFunction, Request, Response } from "express";
import {uploadProfileImage, uploadGroupIcon} from "../utils/uploadImages";
import { MulterError } from "multer";
import ApplicationError from "./errorHandler";
import { errorLogger } from "../utils/logger";

export function uploadProfileImageMiddleWare(req:Request, res:Response, next:NextFunction):void{
    uploadProfileImage(req, res, (err)=>{
        if(err){
            
            errorLogger.error(err);
            
            if(err instanceof MulterError && err.message !== "Unexpected field"){
                next(new ApplicationError(400, err.message));
            }else{
                next(err);
            }
        }else{
            next();
        }
        return;
    })
}


export function uploadGroupIconMiddleWare(req:Request, res:Response, next:NextFunction):void{
    uploadGroupIcon(req, res, (err)=>{
        if(err){
            
            errorLogger.error(err);
            
            if(err instanceof MulterError && err.message !== "Unexpected field"){
                next(new ApplicationError(400, err.message));
            }else{
                next(err);
            }
        }else{
            next();
        }
        return;
    })
}