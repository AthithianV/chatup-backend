import mongoose, {Document} from "mongoose"


export type PrivateChat = {
    _id?: mongoose.Types.ObjectId,
    participants: mongoose.Types.ObjectId[],
    messages: mongoose.Types.ObjectId[],
    lastMessage: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}


export type PrivateChatDocument = PrivateChat & Document;