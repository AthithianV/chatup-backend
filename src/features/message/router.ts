import express, { NextFunction, Response } from "express";
import MessageController from "./controller";
import { AuthorizedRequest } from "../../types/authorizedRequest";

const messageRouter = express.Router();

const messageController = new MessageController();

messageRouter.post(
    "/send-message", 
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
        messageController.sendMessage(req, res, next);
    }
);

messageRouter.put(
    "/edit-message/:messageId", 
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
        messageController.editMessage(req, res, next);
    }
);

messageRouter.delete(
    "/delete-message/:messageId", 
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
        messageController.deleteMessage(req, res, next);
    }
);

export default messageRouter;