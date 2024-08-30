import mongoose, { Document } from "mongoose"


export type GroupChat = {
    _id?: mongoose.Types.ObjectId,
    name: string,
    description: string,
    icon: {
        original: string,
        compressed: string,
    },
    groupAdmin: mongoose.Types.ObjectId,
    participants: mongoose.Types.ObjectId[],
    messages: mongoose.Types.ObjectId[],
    lastMessage: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

export type GroupChatRequest = {
    name: string,
    description?: string,
    groupAdmin?: string,
    participants: string[],
}

export type UpdateGroupRequest = {
    name?: string,
    description?: string,
}

export type GroupChatDocument = GroupChat & Document;