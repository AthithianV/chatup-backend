import express, { NextFunction, Request, Response } from "express";

import UserController from "./controller";
import {uploadProfileImageMiddleWare} from "../../middlewares/uploadImagesMiddleware";
import { AuthorizedRequest } from "../../types/authorizedRequest";

const userRouter = express.Router();

const userController = new UserController();

userRouter.put("/upload-profile-picture", 
    uploadProfileImageMiddleWare,
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
        userController.updateProfilePicture(req, res, next);   
    })

userRouter.put("/update-status", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.updateStatus(req, res, next);   
})

userRouter.put("/add-contact/:userId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.addContact(req, res, next);   
})

userRouter.get("/get-contact-list", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{  
    userController.getContacts(req, res, next);   
})

userRouter.put("/toggle-online", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.toggleOnline(req, res, next);
})


userRouter.put("/block-user/:userId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.blockUser(req, res, next);   
})

userRouter.delete("/leave-group/:groupId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.leaveGroup(req, res, next);
})

userRouter.get("/verify-email", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.verifyEmail(req, res, next);
})

userRouter.put("/confirm-email", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    userController.confirmEmail(req, res, next);
})

userRouter.get("/:userId", (req:Request, res:Response, next:NextFunction)=>{
    userController.getUserProfile(req, res, next);   
})

export default userRouter;
