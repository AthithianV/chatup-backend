import express, { NextFunction, Request, Response } from "express";
import { register_validator_middleware, register_validator } from "../../middlewares/validator";
import AuthController from "./controller";
import { auth } from "../../middlewares/authorization";

const authRouter = express.Router();

const authController:AuthController = new AuthController();

authRouter.post(
    "/register",
    register_validator,
    register_validator_middleware,
    (req:Request, res:Response, next:NextFunction) => {
        authController.register(req, res, next);
    }
);

authRouter.post(
    "/login",
    (req:Request, res:Response, next:NextFunction) => {
        authController.login(req, res, next);
    }
);

authRouter.get(
    "/logout",
    auth,
    (req:Request, res:Response, next:NextFunction) => {
        authController.logout(req, res, next);
    }
);

authRouter.get(
    "/forget-password/:emailId",
    (req:Request, res:Response, next:NextFunction) => {
        authController.forgetPassword(req, res, next);
    }
);


authRouter.post(
    "/verify-otp",
    (req:Request, res:Response, next:NextFunction) => {
        authController.verifyOtp(req, res, next);
    }
);


authRouter.put(
    "/reset-password",
    (req:Request, res:Response, next:NextFunction) => {
        authController.resetPassword(req, res, next);
    }
);


export default authRouter;