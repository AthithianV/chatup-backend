import { NextFunction, Request, Response } from "express";
import { consoleLogger, errorLogger } from "../utils/logger";
import { MongooseError } from "mongoose";

export default class ApplicationError extends Error{
    code:number;
    constructor(code:number, message:string){
        super(message);
        Object.setPrototypeOf(this, ApplicationError.prototype);
        this.code = code;
        this.name = "ApplicationError";
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

export function errorHandler(err:Error, req:Request, res:Response, next:NextFunction){
    
    if(err instanceof MongooseError){
        res.status(400).json({success: false, message: "Invalid data in request"});
    }
    if(err instanceof ApplicationError){
        res.status(err.code).json({success: false, message: err.message});
    }else{
        errorLogger.error({name: err.name, message: err.message, trace: err.stack});
        consoleLogger.error(err);
        res.status(500).json({success: false, message: "Unknown Error Occured. Please Try Again Later."});
    }
}

export const missingError = (model:string, id:string):ApplicationError =>{
    return new ApplicationError(400, `${model} doet not exists for ID:${id}`);
}