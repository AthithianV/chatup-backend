import express from "express";
import PrivateChatController from "./controller";

const privateChatRouter = express.Router();

const privateChatController = new PrivateChatController();

privateChatRouter.put(
    "/create-chat/:userId",
    privateChatController.createChat
);

privateChatRouter.get(
    "/get-chat-history/:chatId",
    privateChatController.getChatHistory
);

privateChatRouter.get(
    "/get-all-chat/:userId",
    privateChatController.getAllChats
);

export default privateChatRouter;