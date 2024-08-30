import express from "express";
import MessageController from "./controller";
import { message_validator, message_validator_middleware } from "../../middlewares/validator";

const messageRouter = express.Router();

const messageController = new MessageController();

messageRouter.post(
    "/send-message", 
    message_validator,
    message_validator_middleware,
    messageController.sendMessage
);

messageRouter.put(
    "/edit-message/:messageId", 
    messageController.editMessage
);

messageRouter.delete(
    "/delete-message/:messageId", 
    messageController.deleteMessage
);

export default messageRouter;