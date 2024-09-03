import { NextFunction, Request, Response } from "express";
import MessageRepository from "./repository";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import SearchRepository from "./repository";

export default class SearchController {
    private searchRepository:SearchRepository;
    constructor() {
        this.searchRepository = new SearchRepository();
    }

    async searchMessage(req:AuthorizedRequest, res:Response, next:NextFunction){
        try {
            let page = 0;
            let limit = 20;
            if(req.query.page){
                page = Number(req.query.page);
            }
            if(req.query.limit){
                limit = Number(req.query.page);
            }
            const searchKey = req.query.searchKey as string;
            const userId = req.user.userId;
            const result = await this.searchRepository.searchMessage(userId, searchKey, page, limit);
            res.status(200).json({userId, searchResult: result});
        } catch (error) {
            next(error);
        }
    }

    async searchChat(req:AuthorizedRequest, res:Response, next:NextFunction){
        try {
            let page = 0;
            let limit = 20;
            if(req.query.page){
                page = Number(req.query.page);
            }
            if(req.query.limit){
                limit = Number(req.query.page);
            }
            const searchKey = req.query.searchKey as string;
            const userId = req.user.userId;
            const result = await this.searchRepository.searchChat(userId, searchKey, page, limit);
            res.status(200).json({userId, searchResult: result});
        } catch (error) {
            next(error);
        }
    }

}


















