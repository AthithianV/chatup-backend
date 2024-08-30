import dotenv from "dotenv";
import app from "./app";
import connectDatabase from "./config/connectToDB";
import { consoleLogger, logger } from "./utils/logger";

dotenv.config();

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const successMessage = `Server Started \n Server Running on Port ${port} \n Visit: ${baseUrl}`;
app.listen(port, async ()=>{
    try {
        logger.info(successMessage);
        consoleLogger.info(successMessage);
        await connectDatabase(process.env.DATABASE_URL+"/chatup");
    } catch (error) {
        consoleLogger.error(error);
        logger.error(error);
    }
})
