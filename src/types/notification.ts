import mongoose from 'mongoose';

export type Notification = {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    type: 'message' | 'system';
    content: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt?: Date;
};


export type NotificationDocument = Notification & Document; 