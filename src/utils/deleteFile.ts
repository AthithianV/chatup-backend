import fs from "fs";

export const deleteFile = (path:string) => {    
    try {
        fs.unlink(path, (err)=>{
            throw err;
        });    
    } catch (error) {        
        throw error;
    }
}