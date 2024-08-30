import express from "express";
import MediaController from "./controller";
import { uploadMedia } from "../../utils/uploadMedia";

const mediaRouter = express.Router();
const mediaController = new MediaController();

mediaRouter.post(
    "/:mediaType",
    uploadMedia,
    mediaController.uploadMedia
)

mediaRouter.delete(
    "/:mediaId",
    mediaController.deleteMedia
)

export default mediaRouter;