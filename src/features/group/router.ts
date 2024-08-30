import express, { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import GroupChatController from "./controller";
import { uploadGroupIcon } from "../../utils/uploadImages";

const groupRouter = express.Router();

const groupChatController = new GroupChatController();

groupRouter.post("/create-group", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.createGroup(req, res,next);
});

groupRouter.put("/update-group/:groupId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.updateGroup(req, res,next);
});

groupRouter.put("/upload-group-icon/:groupId", uploadGroupIcon, groupChatController.groupAdminCheck, (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.updateGroupIcon(req, res,next);
});

groupRouter.delete("/delete-group/:groupId",  groupChatController.groupAdminCheck, (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
   
    groupChatController.deleteGroup(req, res,next);
});

groupRouter.get("/get-group-member/:groupId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.getGroupMembers(req, res,next);
});

groupRouter.get("/get-group-messages/:groupId", (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.getGroupMessages(req, res,next);
});

groupRouter.put("/add-user-to-group",groupChatController.groupAdminCheck, (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.addUserToGroup(req, res,next);
});

groupRouter.delete(
    "/remove-user-from-group/:userId/:groupId",
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
        console.log(req.params);
        groupChatController.groupAdminCheck(req, res,next);
    },
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    groupChatController.removeUserFromGroup(req, res,next);
});

export default groupRouter;




    
      
  