import { NextFunction, Request, Response } from "express";
import NotificationRepository from "./repository";
import { Notification } from "../../types/notification";

export default class NotificationController {
    notificationRepository:NotificationRepository;
    constructor() {
        this.notificationRepository = new NotificationRepository();
    }

    // Create a new notification
    async createNotification(req:Request, res:Response, next:NextFunction) {
        try {
            const notification:Notification = req.body;
            const newNotification = await this.notificationRepository.createNotification(notification);
            res.status(201).json(newNotification);
        } catch (error) {
            next(error);
        }
    }

    // Get notifications for a user
    async getNotifications(req:Request, res:Response, next:NextFunction) {
        try {
            const { userId } = req.params;
            const notifications = await this.notificationRepository.getNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            next(error);
        }
    }

    // Mark a notification as read
    async markAsRead(req:Request, res:Response, next:NextFunction) {
        try {
            const { notificationId } = req.params;
            const notification = await this.notificationRepository.markAsRead(notificationId);
            res.status(200).json({ message: 'Notification marked as read' });
        } catch (error) {
            next(error);
        }
    }

    // Delete a notification
    async deleteNotification(req:Request, res:Response, next:NextFunction) {
        try {
            const { notificationId } = req.params;
            await this.notificationRepository.deleteNotification(notificationId);
            res.status(200).json({ message: 'Notification deleted' });
        } catch (error) {
            next(error);
        }
    }

}