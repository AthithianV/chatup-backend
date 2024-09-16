import express from "express";
import GroupChatController from "./controller";
import { uploadGroupIcon } from "../../utils/uploadImages";

const groupRouter = express.Router();

const groupChatController = new GroupChatController();

groupRouter.post(
    "/create-group", 
    groupChatController.createGroup
);

groupRouter.patch(
    "/update-group/:groupId", 
    groupChatController.updateGroup
);

groupRouter.patch(
    "/upload-group-icon/:groupId",
    uploadGroupIcon,
    groupChatController.groupAdminCheck,
    groupChatController.updateGroupIcon
);

groupRouter.delete(
    "/delete-group/:groupId",
    groupChatController.groupAdminCheck,
    groupChatController.deleteGroup
);

groupRouter.get(
    "/get-group-member/:groupId",
    groupChatController.getGroupMembers
);

groupRouter.get(
    "/get-group-messages/:groupId",
    groupChatController.getGroupMessages
);

groupRouter.patch(
    "/add-user-to-group",
    groupChatController.groupAdminCheck,
    groupChatController.addUserToGroup
);

groupRouter.delete(
    "/remove-user-from-group/:userId/:groupId",
    groupChatController.groupAdminCheck,
    groupChatController.removeUserFromGroup
);

export default groupRouter;