import { createLogger, format, transports } from "winston";
import {format as dateFormat} from "date-fns-tz";

const customDateFormat = ()=>{
    return dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss', {timeZone: process.env.TIME_ZONE});
}

const consoleFormat = format.combine(
    format.colorize(),
    format.timestamp({format: customDateFormat}),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack }) => {
        return stack
        ? `${timestamp} [${level}]: ${message}\n${stack}`
        : `${timestamp} [${level}]: ${message}`;
    })
  );
  
  const fileFormat = format.combine(
    format.timestamp({format: customDateFormat}),
    format.json(),
    format.prettyPrint(),
  );
  

export const logger = createLogger({
    transports: [
        new transports.File({filename: "./logs/app.log", format: fileFormat}),
    ]
})

export const consoleLogger = createLogger({
    transports: [
        new transports.Console({format: consoleFormat})
    ]
})

export const errorLogger = createLogger({
    transports: [
        new transports.File({filename: "./logs/error.log", format: fileFormat}),
        new transports.Console({format: consoleFormat})
    ]
})