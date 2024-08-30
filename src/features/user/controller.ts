import { NextFunction, Request, Response } from "express";

import UserRepository from "./repository";
import { SensitiveUser } from "../../types/user";
import ApplicationError from "../../middlewares/errorHandler";
import { consoleLogger, logger } from "../../utils/logger";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import mongoose from "mongoose";


export default class UserController {
    userRepository:UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    getUserProfile = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const userId = req.params.userId;
            const user:SensitiveUser = await this.userRepository.getUserProfile(userId);
            
            const message = `Details of user: ${user.username} is sent`;
            consoleLogger.info(message);
            logger.info(message);
            
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    updateProfilePicture = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {

            if(!req.file){
                throw new ApplicationError(400, "Image is not attached");
            }

            await this.userRepository.updateProfilePicture(req.file.filename, req.user.userId);
            
            const message = `Profile picture updated successfully for ${req.user.username}`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })

        } catch (error) {
            next(error);
        }
    }

    
    updateStatus = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const userId = req.user.userId;
            const status = req.body.status;
            await this.userRepository.updateStatus(userId, status);

            const message = `Status of the user: ${req.user.username} is Updated successfully`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json(
                {
                    success: true,
                    message
                }
            )

        } catch (error) {
            next(error);
        }
    }

    toggleOnline = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            
            const {userId, username} = req.user;
            const online = await this.userRepository.toggleOnline(userId);

            let message = `${username} is online`;
            if(!online){
                message = `${username} is offline`;
            }
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })

        } catch (error) {
            next(error);
        }
    }

    addContact = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const newContactId = req.params.userId;
            const {userId, username} = req.user;
            const newContactUserName = await this.userRepository.addContact(userId, newContactId);
            
            const message = `${newContactUserName} is added to contact list of ${username}`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })


        } catch (error) {
            next(error);
        }
    }

    getContacts = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const {userId, username} = req.user;            
            const list:mongoose.Types.ObjectId[] = await this.userRepository.getContacts(userId);
            
            const message = `Contact list of ${username} has been sent`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json(list);


        } catch (error) {
            next(error);
        }
    }


    blockUser = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const blockUserId = req.params.userId;
            
            const {userId, username} = req.user;
            const blockedUser = await this.userRepository.blockUser(userId, blockUserId);
            
            const message = `${blockedUser} is blocked by ${username}`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })


        } catch (error) {
            next(error);
        }
    }

    leaveGroup = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const userId:string = req.user.userId;
            const groupId:string = req.params.groupId;
            
            await this.userRepository.leaveGroup(userId, groupId);

            const message = `User:${userId} left the Group:${groupId} Successfully`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })

        } catch (error) {
            next(error);
        }
    }

    verifyEmail = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            const {email, username} = req.user;
            await this.userRepository.verifyEmail(email);

            const message = `Email Verification initiated for ${username} and OTP sent to ${email}`
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })

        } catch (error) {
            next(error);
        }
    }

    confirmEmail = async (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        try {
            
            const {email, username} = req.user;
            const otp = req.body.otp;
            
            await this.userRepository.confirmEmail(email, otp);

            const message = `Email is verified for ${username}`;
            consoleLogger.info(message);
            logger.info(message);

            res.status(201).json({
                success: true,
                message
            })

        } catch (error) {
            next(error);
        }
    }

}