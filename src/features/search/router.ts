import express, { NextFunction, Response } from "express";
import SearchController from "./controller";
import { AuthorizedRequest } from "../../types/authorizedRequest";

const searchRouter = express.Router();

const searchController = new SearchController();

searchRouter.get(
    "/message",
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>searchController.searchMessage(req, res, next)
)

searchRouter.get(
    "/user",
    (req:AuthorizedRequest, res:Response, next:NextFunction)=>searchController.searchUser(req, res, next)
)

// searchRouter.get(
//     "/chat",
//     (req:AuthorizedRequest, res:Response, next:NextFunction)=>searchController.searchChat(req, res, next)
// )

export default searchRouter;