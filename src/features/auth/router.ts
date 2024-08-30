import express from "express";
import { register_validator_middleware, register_validator } from "../../middlewares/validator";
import AuthController from "./controller";
import { auth } from "../../middlewares/authorization";

const authRouter = express.Router();

const authController:AuthController = new AuthController();

authRouter.post(
    "/register",
    register_validator,
    register_validator_middleware,
    authController.register
);

authRouter.post(
    "/login", 
    authController.login
);

authRouter.get(
    "/logout",
    auth,
    authController.logout
);

authRouter.get(
    "/forget-password/:emailId",
    authController.forgetPassword
);

authRouter.post(
    "/verify-otp",
    authController.verifyOtp
);

authRouter.put(
    "/reset-password",
    authController.resetPassword
);


export default authRouter;