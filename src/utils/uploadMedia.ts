import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import ApplicationError from "../middlewares/errorHandler";

const storage = multer.diskStorage({
    destination: (req:Request, file, cb)=>{
        let path = "";
        const mediaType = req.params.mediaType;
        switch (mediaType) {
            case "image":
                path = "uploads/media/images/original";
                break;
            case "video":
                path = "uploads/media/video/original";
                break;
            case "audio":
                path = "uploads/media/audio";
            case "file":
                path = "uploads/media/file";
            default:
                throw new ApplicationError(400, "Media Type unsupported");
        }
        cb(null, path)
    },
    filename: (req:Request, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, `image-${uniqueSuffix}`);
    }
})

const filter = (req:Request, file:Express.Multer.File, cb:FileFilterCallback) => {
    
    let fileTypes = /jpg/;

    const media = req.params.mediaType;

    switch (media) {
        case "image":
            fileTypes = /jpg|jpeg|png/;
            break;
        case "video":
            fileTypes = /mp4|mkv/;
            break;
        case "audio":
            fileTypes = /mp3|m4a|wav/;
            break;
        case "file":
            fileTypes = /pdf|doc|docx|xslx|csv/;
            break;
        default:
            throw new ApplicationError(400, "Media Type unsupported");
    }

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if(extname && mimeType){
        return cb(null, true);
    }else{
        switch (media) {
            case "image":
                return cb(new Error("Supported format for images are jpeg, jpg or png"));
            case "video":
                return cb(new Error("Supported format for video are mp4,mkv"));
            case "audio":
                return cb(new Error("Supported format for audio are mp3, mkv, wav"));
            case "file":
                return cb(new Error("Supported format for file are pdf,doc,docx,xslx,csv"));
            default:
                break;
        }
    }
}

export const uploadMedia = multer({
    storage,
    fileFilter: filter,
    limits: {
        fileSize: 1*1024*1024
    }
}).array("files", 5);