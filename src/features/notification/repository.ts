import mongoose, { Mongoose } from "mongoose";
import ApplicationError, { missingError } from "../../middlewares/errorHandler";
import { Notification, NotificationDocument } from "../../types/notification";
import { UserDocument } from "../../types/user";
import UserRepository from "../user/repository";
import userModel from "../user/schema";
import notificationModel from "./schema";

export default class NotificationRepository {
    
    // Create a new notification
    async createNotification(notification:Notification) {
        try {
            if(notification.type === 'message' && !notification.message){
                throw new ApplicationError(400, "Message ID is required when notification type is message")
            }
            const user:UserDocument = await UserRepository.getUserById(notification.userId);
            
            const newNotification:NotificationDocument = await notificationModel.create(notification);
            if(!newNotification){
                throw new ApplicationError(500, "Error occured while creating notification");
            }

            user.notifications.push(newNotification._id as mongoose.Types.ObjectId);
            user.updatedAt = new Date();
            await user.save();

            return newNotification;
        } catch (error) {
            throw error;
        }
    }

    // Get notifications for a user
    async getNotifications(userId:string){
        try {
            const user = await userModel.findById(userId).select('notifications').populate('notifications');
            if(!user){
                throw missingError("User", userId);
            }
            return user.notifications;
        } catch (error) {
            throw error;
        }
    }

    // Mark a notification as read
    async markAsRead(notificationId:string) {
        try {
            const notification = await notificationModel.updateOne({_id: notificationId}, {isRead: true});
            if(!notification){
                throw missingError("Notification", notificationId);
            }
        } catch (error) {
            throw error;
        }
    }

    // Delete a notification
    async deleteNotification(notificationId:string) {
        try {
            const deletedRecord = await notificationModel.findByIdAndDelete(notificationId);
            if(!deletedRecord){
                throw missingError("Notification", notificationId);
            }
            const user = await UserRepository.getUserById(deletedRecord.userId);
            user.notifications = user.notifications.filter((id)=>{
                console.log(id);
                console.log(deletedRecord._id);
                return !deletedRecord._id.equals(id)
            });
            user.updatedAt = new Date();
            await user.save();

            // await userModel.updateOne({_id: deletedRecord.userId}, {
            //     "pull": {notifications: deletedRecord._id}, 
            //     "set": {updatedAt: new Date()}
            // });
            
        } catch (error) {
            throw error;
        }
    }
}
