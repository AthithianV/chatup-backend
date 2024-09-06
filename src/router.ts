import express, { NextFunction, Request, Response } from "express";
import path from "path";

import { auth } from "./middlewares/authorization";
import authRouter from "./features/auth/router";
import userRouter from "./features/user/router";
import groupRouter from "./features/group/router";
import privateChatRouter from "./features/chat/router";
import messageRouter from "./features/message/router";
import mediaRouter from "./features/media/router";
import notificationRouter from "./features/notification/router";
import PresenceRouter from "./features/presence/router";
import searchRouter from "./features/search/router";

const router = express.Router();

const profilePicPath = path.join("uploads", "profile");
const groupIconPath = path.join("uploads", "groupIcon");
const mediaPath = path.join("uploads", "media");
router.use("/profile", auth, express.static(profilePicPath));
router.use("/group-icon", auth, express.static(groupIconPath));
router.use("/media", auth, express.static(mediaPath));


router.use("/auth", authRouter);
router.use("/user", auth, userRouter);
router.use("/chat", auth, privateChatRouter);
router.use("/group", auth, groupRouter);
router.use("/message", auth, messageRouter);
router.use("/media", auth,  mediaRouter);
router.use("/notification", notificationRouter);
router.use("/presence", auth,  PresenceRouter);
router.use("/search", auth, searchRouter);


router.get("/", (req:Request, res:Response, next:NextFunction)=>{
    res.status(200).send("Welcome to Chatup");
})

export default router;