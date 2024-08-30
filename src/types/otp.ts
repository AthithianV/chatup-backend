import mongoose, { Document } from "mongoose"

export type Otp = {
    id?: mongoose.Types.ObjectId,
    email: string,
    otp: number,
    expiry: Date,
    verified: boolean,
    createdAt: Date
}

export type OtpDocument = Otp & Document;
