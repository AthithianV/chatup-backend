import express from "express";
import MessageController from "./controller";

const messageRouter = express.Router();

const messageController = new MessageController();

messageRouter.post(
    "/send-message", 
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