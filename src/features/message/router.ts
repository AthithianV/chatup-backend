import express, { NextFunction, Request, Response } from "express";
import MessageController from "./controller";
import { message_validator, message_validator_middleware } from "../../middlewares/validator";

const messageRouter = express.Router();

const messageController = new MessageController();

messageRouter.post(
    "/send-message", 
    message_validator,
    message_validator_middleware,
    (req:Request, res:Response, next:NextFunction)=>messageController.sendMessage(req, res, next)
);

messageRouter.put(
    "/edit-message/:messageId", 
    (req:Request, res:Response, next:NextFunction)=>messageController.editMessage(req, res, next)
);

messageRouter.delete(
    "/delete-message/:messageId", 
    (req:Request, res:Response, next:NextFunction)=>messageController.deleteMessage(req, res, next)
);

export default messageRouter;