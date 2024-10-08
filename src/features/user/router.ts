import express from "express";

import UserController from "./controller";
import {uploadProfileImageMiddleWare} from "../../middlewares/uploadImagesMiddleware";
const userRouter = express.Router();

const userController = new UserController();

userRouter.put(
    "/upload-profile-picture", 
    uploadProfileImageMiddleWare,
    userController.updateProfilePicture   
)

userRouter.patch(
    "/update-status", 
    userController.updateStatus   
)

userRouter.patch(
    "/add-contact/:userId", 
    userController.addContact   
)

userRouter.get(
    "/get-contact-list",   
    userController.getContacts   
)

// userRouter.put(
//     "/toggle-online", 
//     userController.toggleOnline
// )


userRouter.patch(
    "/block-user/:userId", 
    userController.blockUser   
)

userRouter.delete(
    "/leave-group/:groupId", 
    userController.leaveGroup
)

userRouter.get(
    "/verify-email", 
    userController.verifyEmail
)

userRouter.put(
    "/confirm-email", 
    userController.confirmEmail
)

userRouter.get(
    "/:userId",
    userController.getUserProfile   
)

export default userRouter;
