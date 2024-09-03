import express, { NextFunction, Request, Response } from "express";
import PresenceController from "./controller";
import PresenceRepository from "./repository";

const PresenceRouter = express.Router();

const presenceRepository = new PresenceRepository();
const presenceController = new PresenceController(presenceRepository);

PresenceRouter.patch(
    "/update-status", 
    (req:Request, res:Response, next:NextFunction)=>presenceController.updateStatus(req, res, next)
);
PresenceRouter.get(
    "/get-status/:userId",
    (req:Request, res:Response, next:NextFunction)=>presenceController.getUserStatus(req, res, next)
);

export default PresenceRouter;