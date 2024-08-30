import mongoose from "mongoose";
import { MessageDocument } from "../../types/message";


const messageSchema = new mongoose.Schema<MessageDocument>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    chatType: {
        type: String,
        enum: ['group', 'private'],
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    media:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'file', 'audio'],
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    replyToMessageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    readAt: {
        type: Date
    }
});

const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;