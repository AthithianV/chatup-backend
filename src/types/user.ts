import mongoose, { Document } from "mongoose"

export type RegisterUser = {
    username: string 
    email: string 
    password: string,
}

export type User = {
    _id?: mongoose.Types.ObjectId,
    username:string,
    email:string,
    password:string,
    profilePicture: {
        original: string,
        compressed: string,
    },
    status:string,
    lastActive:Date,
    online:boolean,
    contacts: mongoose.Types.ObjectId[],
    groups: mongoose.Types.ObjectId[],
    privateChats: mongoose.Types.ObjectId[],
    blockedUsers: mongoose.Types.ObjectId[],
    createdAt:Date,
    updatedAt:Date,
    notifications: mongoose.Types.ObjectId[],
    emailVerified: boolean,
    isAdmin:boolean,
  }

  export type SensitiveUser = {
    _id: mongoose.Types.ObjectId,
    username:string,
    email:string,
    profilePicture: {
        original: string,
        compressed: string,
    },
    status:string,
    lastActive:Date,
    online:boolean,
  }

  export type UserDocument = User & Document;


  export type UserWithoutPassword = Omit<User, "password">;