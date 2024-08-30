import mongoose from "mongoose";
import { PrivateChatDocument } from "../../types/chat";
import ApplicationError from "../../middlewares/errorHandler";


const privateChatSchema = new mongoose.Schema<PrivateChatDocument>({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

privateChatSchema.pre('save', function (next){
    if(this.participants.length !== 2){
        return next(new ApplicationError(400, 'Private Chat must have excatly 2 members'));
    }
    next();
})

const privateChatModel = mongoose.model<PrivateChatDocument>("PrivateChat", privateChatSchema);

export default privateChatModel;