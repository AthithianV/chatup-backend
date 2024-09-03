import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { consoleLogger, logger } from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import userRouter from "./features/user/router";
import authRouter from "./features/auth/router";
import { auth } from "./middlewares/authorization";
import swaggerJson from "./../public/swagger.json";
import { AuthorizedRequest } from "./types/authorizedRequest";
import privateChatRouter from "./features/chat/router";
import groupRouter from "./features/group/router";
import messageRouter from "./features/message/router";
import mediaRouter from "./features/media/router";
import notificationRouter from "./features/notification/router";
import PresenceRouter from "./features/presence/router";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((req:Request, res:Response, next:NextFunction)=>{
    const message = `Incoming Request: [${req.method}] ${req.url}`;
    logger.info(message);
    consoleLogger.info(message);
    next();
});

/**
 * 
 * Unauthoried
 */
app.use((req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    req.user = {
        email: "athithianv@gmail.com",
        username: "Athithian",
        userId: "66c73687a2e308888539f622"
    }
    next();
});

const profilePicPath = path.join("uploads", "profile");
const groupIconPath = path.join("uploads", "groupIcon");
const mediaPath = path.join("uploads", "media");
app.use("/profile", /*auth,*/ express.static(profilePicPath));
app.use("/group-icon", /*auth*/ express.static(groupIconPath));
app.use("/media", /*auth*/ express.static(mediaPath));


app.use("/auth", authRouter);
app.use("/user", /*auth,*/ userRouter);
app.use("/chat", /*auth,*/ privateChatRouter);
app.use("/group", /*auth,*/ groupRouter);
app.use("/message", /*auth,*/ messageRouter);
app.use("/media", mediaRouter);
app.use("/notification", notificationRouter);
app.use("/presence", PresenceRouter);


app.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.status(200).send("Welcome to Chatup");
})

app.use(errorHandler);
app.use((req:Request, res:Response)=>{
    res.status(404).json({message:"API does not exists"});
})

export default app;