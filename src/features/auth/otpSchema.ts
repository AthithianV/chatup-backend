import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: Number, required: true},
    expiry: {type: Date, required: true},
    verified: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()}
})


const otpModel = mongoose.model("otp", otpSchema);
export default otpModel;