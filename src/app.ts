import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { consoleLogger, logger } from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerJson from "./../public/swagger.json";
import router from "./router";



const app = express();

app.use(cors)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((req:Request, res:Response, next:NextFunction)=>{
    const message = `Incoming Request: [${req.method}] ${req.url}`;
    logger.info(message);
    consoleLogger.info(message);
    next();
});

app.use("/api", router);

app.use(errorHandler);
app.use((req:Request, res:Response)=>{
    res.status(404).json({message:"API does not exists"});
})

export default app;