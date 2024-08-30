import mongoose from "mongoose";
import { UserDocument } from "../../types/user";

const userSchema = new mongoose.Schema<UserDocument>({
    username: { 
      type: String, 
      unique: true, 
      required: true 
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: { 
      type: {
          original: {
            type: String,
          },
          compressed: {
            type: String,
          },
      }
    },
    status: {
      type: String,
      default: 'Available'
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    online: {
      type: Boolean,
      default: false

    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
      }
    ],
    privateChats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrivateChat'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now()

    },
    updatedAt: {
      type: Date,
      default: Date.now()

    },
    notifications: [{
      type: Object,
      ref: 'Notification' }],
    emailVerified: {
      type: Boolean,
      default: false

    },
    isAdmin: {
      type: Boolean,
      default: false

    },
  });


const userModel = mongoose.model<UserDocument>("User", userSchema);
export default userModel;