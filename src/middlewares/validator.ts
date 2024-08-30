import { NextFunction, Request, Response } from "express";
import {body, validationResult} from "express-validator";
import { errorLogger } from "../utils/logger";

export const register_validator = [
    body('username')
        .notEmpty().withMessage('Username is Required')
        .isLength({min:3, max: 20}).withMessage('Size of username should in range 3 - 20')
        .matches(/^\S*$/).withMessage('White Space or Tabs not allowed'),
    body('email')
        .notEmpty().withMessage('Email Missing')
        .isEmail().withMessage("Invalid Email"),
    body('password')
        .notEmpty().withMessage('Password Missing')
        .isLength({min:6}).withMessage('Password Must be at least 6 character long'),
]; 

export const register_validator_middleware = (req: Request, res: Response, next:NextFunction):void=>{
    const error = validationResult(req);    
    if(error.isEmpty()){
        next();
    }else{
        const errorMessages = error.array().map(e=>e.msg);
        errorLogger.error(errorMessages);
        res.status(400).json({success: "failed", message: errorMessages});
    }
}

export const message_validator = [
    body('content')
        .notEmpty().withMessage("content Should not be empty"),
    body('messageType').custom((value, { req }) => {
        if (value !== 'text' && !req.body.media) {
            throw new Error('Id of Media field is required if messageType is not text');
        }
        return true;
    })
];

export const message_validator_middleware = (req: Request, res: Response, next:NextFunction):void=>{
    const error = validationResult(req);    
    if(error.isEmpty()){
        next();
    }else{
        const errorMessages = error.array().map(e=>e.msg);
        res.status(400).json({success: "failed", message: errorMessages});
    }
}

