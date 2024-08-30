import mongoose from "mongoose";
import { MediaDocument } from "../../types/media";

const mediaSchema = new mongoose.Schema<MediaDocument>({
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Map,
        of: String  // Allows storing additional metadata as key-value pairs
    }
});

const mediaModel = mongoose.model<MediaDocument>('Media', mediaSchema);
export default mediaModel;