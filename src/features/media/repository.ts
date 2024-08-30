import mongoose from "mongoose";
import mediaModel from "./schema";
import compressImage from "../../utils/compressImage";
import { generateVideoThumbnail } from "../../utils/videoThumbnailGenerator";
import { MediaDocument } from "../../types/media";
import { missingError } from "../../middlewares/errorHandler";
import { deleteFile } from "../../utils/deleteFile";


export default class MediaRepository{

    uploadMedia = async (files:Express.Multer.File[], mediaType:string):Promise<mongoose.Types.ObjectId[]>=> {
        try {
            const mediaIds:mongoose.Types.ObjectId[] = [];            

            files.forEach(async (file:Express.Multer.File)=>{
                const originalPath:string = `${file.destination}/${file.filename}`;
                let thumbnailUrl = "";

                switch(mediaType){
                    case "image":
                        const compressedPath:string = originalPath.replace("original", "compressed");
                        await compressImage(originalPath, compressedPath);
                        thumbnailUrl = compressedPath.replace("uploads", "");
                        break;
                    case "video":
                        const thumbnailPath = originalPath.replace("original", "thumbnail").split(".")[0]+".png";
                        generateVideoThumbnail(originalPath, thumbnailPath, (err)=>{
                            throw err;
                        });
                        break;
                    default:
                        break;
                }

                

                const fileUrl:string = originalPath.replace("uploads", "");
                thumbnailUrl = thumbnailUrl.replace("uploads", "");
                
                const media:MediaDocument = await mediaModel.create({
                    fileName: file.filename,
                    fileType: file.mimetype,
                    fileSize: file.size,
                    url: fileUrl,
                    thumbnailUrl
                })

                mediaIds.push(media._id as mongoose.Types.ObjectId);
            })
            
            return mediaIds;
        } catch (error) {
            throw error;
        }
    }

    deleteMedia = async (mediaId:string) => {
        try {
            const media:MediaDocument|null = await mediaModel.findByIdAndDelete({_id: mediaId});
            if(!media){
                throw missingError("Media", mediaId);
            }
            const path = `uploads${media.url}`;
            const thumbnailPath = `uploads${media.thumbnailUrl}`;
            deleteFile(path);
            deleteFile(thumbnailPath);
        } catch (error) {
            throw error;
        }
    }
}