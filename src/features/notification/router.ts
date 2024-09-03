import express, { NextFunction, Request, Response } from "express";
import MessageController from "./controller";
import NotificationController from "./controller";

const notificationRouter = express.Router();

const notificationController = new NotificationController();
// Create a notification
notificationRouter.post('/', (req:Request, res:Response, next:NextFunction)=>notificationController.createNotification(req,res,next));

// Get notifications for a user
notificationRouter.get('/:userId', (req:Request, res:Response, next:NextFunction)=>notificationController.getNotifications(req,res,next));

// Mark a notification as read
notificationRouter.patch('/:notificationId/read', (req:Request, res:Response, next:NextFunction)=>notificationController.markAsRead(req,res,next));

// Delete a notification
notificationRouter.delete('/:notificationId', (req:Request, res:Response, next:NextFunction)=>notificationController.deleteNotification(req,res,next));


export default notificationRouter;