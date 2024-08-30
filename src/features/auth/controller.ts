import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import AuthRepository from "./repository";
import { consoleLogger, errorLogger, logger } from "../../utils/logger";
import { User } from "../../types/user";
import { AuthorizedRequest } from "../../types/authorizedRequest";

export default class AuthController{
    authRepository:AuthRepository;
    constructor(){
        this.authRepository = new AuthRepository();
    }

    register = async (req:Request, res:Response, next:NextFunction) => {
        const user = req.body;
        try {
            const newUser = await this.authRepository.register(user);
            logger.info("Response status: 201"+" New User Registered Successfully");
            res.status(201).json(
                {
                    success: true, 
                    message: "User Created Successfully",
                }
            );
        } catch (error){
            errorLogger.warn(`Registration Attempt failed for Email: ${user.email}, username: ${user.username}`);
            next(error);
        }
    }
    
    login = async (req:Request, res:Response, next:NextFunction) => {
        const user = req.body;
        try {
            const result:User = await this.authRepository.login(user);

            const secretKey = process.env.SECRET_KEY;

            if (!secretKey) {
                throw new Error('SECRET_KEY is not defined in the environment variables');
            }

            const token = jwt.sign(
                {
                    username: result.username, 
                    email: result.email,
                    userId: result._id,
                },
                secretKey,
                {expiresIn: "1h"}
            );

            logger.info(`Response status: 200 - ${result.username} is Logged In`);
            res
                .status(200)
                .cookie(
                    "token", 
                    token,
                    {
                        secure: process.env.NODE_ENV==="production",
                        httpOnly: true,
                        sameSite: "strict",
                        maxAge: 360000
                    }
                )
                .json(
                    {
                        success: true,
                        message: "User is logged in successfully",
                        token
                    }
                );
        } catch (error) {
            errorLogger.error(`Login Attempt failed for email: ${user.email}`);
            next(error);
        }
    }
    
    logout = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const message = `${req.user.username} successfully logged out`;
            logger.info(message);
            res
            .status(200)
            .clearCookie(
                "token",
                {
                    httpOnly: true, 
                    secure: process.env.NODE_ENV==="production",
                    sameSite:"strict"
                }
            ).send({success: true, message});
        } catch (error) {
            next(error);
        }
    }
    
    forgetPassword = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const email:string = req.params.emailId;
            const otp = await this.authRepository.forgetPasword(email);
        
            consoleLogger.info(`OTP Sent to ${email}`);
            logger.info(`OTP Sent to ${email}`);

            res
            .status(200)
            .json(
                {
                    success: true,
                    message: "OTP sent successfully",
                }
            )
        } catch (error) {
            next(error);
        }
    }
    
    verifyOtp = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {email, otp}:{email:string, otp:number} = req.body;
            await this.authRepository.verifyOtp(email, otp);

            consoleLogger.info(`OTP verified for ${email}`);
            logger.info(`OTP verified for ${email}`);
            

            res
            .status(200)
            .json(
                {
                    success: true,
                    message: "Otp Verified Successfully"
                }
            );
        } catch (error) {
            next(error);
        }
    }

    resetPassword = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {email, newPassword} = req.body;
            await this.authRepository.resetPassword(email, newPassword);
            res
            .status(201)
            .json(
                {
                    success:true,
                    message: "Password Updated Successfully"
                }
            )
        } catch (error) {
            next(error);
        }
    }
}