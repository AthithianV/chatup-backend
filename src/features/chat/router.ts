import express, { NextFunction, Response } from "express";
import PrivateChatController from "./controller";
import { AuthorizedRequest } from "../../types/authorizedRequest";

const privateChatRouter = express.Router();

const privateChatController = new PrivateChatController();

privateChatRouter.put("/create-chat/:userId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    privateChatController.createChat(req, res,next);
});

privateChatRouter.get("/get-chat-history/:chatId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    privateChatController.getChatHistory(req, res,next);
});

privateChatRouter.get("/get-all-chat/:userId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    privateChatController.getAllChats(req, res,next);
});


export default privateChatRouter;