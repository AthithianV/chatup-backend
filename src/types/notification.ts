import mongoose from 'mongoose';

export type Notification = {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    type: 'message' | 'system' | 'alert';
    content: string;
    isRead?: boolean;
    message?: mongoose.Types.ObjectId;
    actionUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
};


export type NotificationDocument = Notification & Document; 