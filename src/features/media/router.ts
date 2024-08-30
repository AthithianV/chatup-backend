import express, { NextFunction, Response } from "express";
import MediaController from "./controller";
import { AuthorizedRequest } from "../../types/authorizedRequest";

const mediaRouter = express.Router();
const mediaController = new MediaController();

mediaRouter.post(
    "/upload-file",
    (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        mediaController.uploadFile(req, res, next);
    }
)

mediaRouter.delete(
    "/delete-file",
    (req:AuthorizedRequest, res:Response, next:NextFunction) => {
        mediaController.uploadFile(req, res, next);
    }
)

export default mediaRouter;