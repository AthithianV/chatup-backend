import fs from "fs";
import { consoleLogger } from "./logger";

export const deleteFile = (path:string) => {
    fs.unlink(path, (err)=>{
        if(err)
            consoleLogger.error(err);
        else
            console.log(`File ${path} has been successfully removed.`);
    })
}