import nodeMailer from "nodemailer";
import { consoleLogger, errorLogger, logger } from "./logger";


const sendEmail = async (to:string, subject: string, text: string, html?: string)=>{
    
    const transport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });


    try {
        const info = await transport.sendMail({
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
            html
        });
        consoleLogger.info(`${subject} - Email sent to ${to}`);
        logger.info(`${subject} - Email sent to ${to}`);
    } catch (error) {
        consoleLogger.error(`Error while sending Email to ${to}`);
        errorLogger.error(`Error while sending Email to ${to}`);
        throw error;
    }
}

export default sendEmail;