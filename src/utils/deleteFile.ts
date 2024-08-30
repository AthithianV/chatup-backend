import fs from "fs";

export const deleteFile = (path:string) => {
    console.log(path);
    
    try {
        fs.unlink(path, (err)=>{
            console.log(err);
            throw err;
        });    
    } catch (error) {        
        throw error;
    }
}