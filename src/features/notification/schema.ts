import mongoose from "mongoose";
import { NotificationDocument } from "../../types/notification";

const notificationSchema = new mongoose.Schema<NotificationDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['message', 'system', 'alert'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    actionUrl:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const notificationModel = mongoose.model<NotificationDocument>('Notification', notificationSchema);
export default notificationModel;