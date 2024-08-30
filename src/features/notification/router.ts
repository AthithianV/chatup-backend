import express from "express";
import MessageController from "./controller";

const messageRouter = express.Router();

const messageController = new MessageController();
messageRouter.use("/add", messageController.add);

export default messageRouter;