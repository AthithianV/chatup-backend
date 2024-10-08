import mongoose, { Document } from 'mongoose';

export type Media = {
    _id?: mongoose.Types.ObjectId;
    fileName: string;
    fileType: string;
    fileSize: number;
    url: string;
    thumbnailUrl?: string;
    uploadedAt?: Date;
    metadata?: Record<string, string>;
};

export type MediaDocument = Media & Document;