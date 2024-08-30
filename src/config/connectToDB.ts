import mongoose from "mongoose";
import { consoleLogger, errorLogger, logger } from "../utils/logger";

const msg = {
    success: "MongoDB is connected Successfully"
}


async function connectDatabase(uri:string):Promise<void>{
    try {
        await mongoose.connect(uri);
        logger.info(msg.success);
        consoleLogger.info(msg.success);
    } catch (error) {
        errorLogger.error(error);
        throw error;
    }
}

export default connectDatabase;