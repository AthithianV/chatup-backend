import { Request } from "express";
import multer from "multer";
import { AuthorizedRequest } from "../types/authorizedRequest";
import path from "path";

const profilePicStorage = multer.diskStorage({
    destination: (req:Request, file, cb)=>{
        cb(null, 'public/uploads/profile/original');
    },
    filename: (req:AuthorizedRequest, file, cb)=>{
        cb(null, `Profile-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const groupIconStorage = multer.diskStorage({
    destination: (req:Request, file, cb)=>{
        cb(null, 'public/uploads/groupIcon/original');
    },
    filename: (req:AuthorizedRequest, file, cb)=>{
        cb(null, `Group-Icon${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFormat = (req:Request, file:any, cb:any)=>{
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if(extname && mimeType){
        return cb(null, true);
    }else{
        return cb("Image Only! (jpeg, jpg or png)")
    }
}


export const uploadProfileImage = multer({
    storage: profilePicStorage,
    limits: {
        fileSize: 2 * 1024 *1024
    },
    fileFilter: fileFormat,
}).single("image");

export const uploadGroupIcon = multer({
    storage: groupIconStorage,
    limits: {
        fileSize: 2 * 1024 *1024
    },
    fileFilter: fileFormat,
}).single("image");
