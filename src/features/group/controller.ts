import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import GroupChatRepository from "./repository";
import ApplicationError from "../../middlewares/errorHandler";


export default class GroupChatController{

    groupChatRepository:GroupChatRepository;
    constructor(){
        this.groupChatRepository = new GroupChatRepository();
    }

    createGroup = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            const userId = req.user.userId;
            const groupData = req.body;
            await this.groupChatRepository.createGroup(userId, groupData);
            res.status(201).json({success: true, message: 'New Group has been created'})
        } catch (error) {
            next(error);
        }
    }

    groupAdminCheck = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            const userId = req.user.userId;
            const groupId = req.params.groupId;
            const check = await this.groupChatRepository.groupAdminCheck(userId, groupId);
            next();
        } catch (error) {
            next(error);
        }
    }

    updateGroup = async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const groupId = req.params.groupId;
            const updateData = req.body;
            await this.groupChatRepository.updateGroup(groupId, updateData);
            res.status(201).json({success: true, message: `Group (ID: ${groupId}) has been updated Successfully`});
        } catch (error) {
            next(error);
        }
    }

    updateGroupIcon = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            if(!req.file){
                throw new ApplicationError(500, "File is missing");
            }
            const groupId = req.params.groupId;
            const filename = req.file.filename;
            await this.groupChatRepository.updateGroupIcon(groupId, filename, req.user.userId);
            res.status(201).json({success: true, message: `Group Icon for Group (ID: ${groupId}) has been updated Successfully`});
        } catch (error) {
            next(error);
        }
    }

    deleteGroup = async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const groupId = req.params.groupId;
            await this.groupChatRepository.deleteGroup(groupId);
            res.status(201).json({success: true, message: `Group (ID: ${groupId}) has been deleted Successfully`});
        } catch (error) {
            next(error);
        }
    }

    getGroupMembers = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            const groupId = req.params.groupId;
            const group = await this.groupChatRepository.getGroupMembers(groupId);
            res.status(201).json(group);
        } catch (error) {
            next(error);
        }
    }

    getGroupMessages = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            const groupId = req.params.groupId;
            let page:number;
            let limit:number;
            if(!req.query){
                page = 0;
                limit = 20;
            }else{
                page = Number(req.query.page);
                limit = Number(req.query.limit);    
            }
            const group = await this.groupChatRepository.getGroupMessages(groupId, page,limit);
            res.status(201).json(group);
        } catch (error) {
            next(error);
        }
    }

    addUserToGroup = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            const groupId = req.query.groupId as string;
            const userId = req.query.userId as string;
            await this.groupChatRepository.addUserToGroup(groupId, userId);
            res.status(201).json({success:true, message: `User:${userId} is added to the group:${groupId} successfully`})
        } catch (error) {
            next(error);
        }
    }

    removeUserFromGroup = async (req:AuthorizedRequest, res:Response, next:NextFunction) =>{
        try {
            const groupId:string|undefined = req.query.groupId as string | undefined;
            const userId:string|undefined = req.query.userId as string | undefined;
            if(!groupId){
                throw new ApplicationError(400, "GroupId Required");
                
            }
            if(!userId){
                throw new ApplicationError(400, "userId Required");   
            }
            await this.groupChatRepository.removeUserFromGroup(groupId, userId);
            res.status(201).json({success:true, message: `User:${userId} is deleted from the group:${groupId} successfully`})
        } catch (error) {
            next(error);
        }
    }
}