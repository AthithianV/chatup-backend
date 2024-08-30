import mongoose, { Document } from "mongoose";

export type Message = {
    _id?: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId; 
    chatType: 'group' | 'private';
    sender: mongoose.Types.ObjectId;
    content: string;
    media?: mongoose.Types.ObjectId,
    messageType: 'text' | 'image' | 'video' | 'file' | 'audio';
    isRead?: boolean;
    replyToMessageId?: mongoose.Types.ObjectId;
    createdAt?: Date;
    readAt?: Date;
}

export type MessageDocument = Message & Document;