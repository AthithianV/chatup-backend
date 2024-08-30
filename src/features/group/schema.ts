import mongoose from "mongoose";
import { GroupChatDocument } from "../../types/group";
import ApplicationError from "../../middlewares/errorHandler";


const groupChatSchema = new mongoose.Schema<GroupChatDocument>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "Chatup Group"
    },
    icon: {
        original: String,
        compressed: String,
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const groupChatModel = mongoose.model<GroupChatDocument>("GroupChat", groupChatSchema);
export default groupChatModel;