import express from "express";
import {
  loginController,
  signUpController,
} from "../controller/auth.controller";
import { ValidateRequestMiddleware } from "../middlewares/validatedSchema.middleware";
import { UserSchemaLogin, UserSchemaRegister } from "../models/user.model";

export const authRouter = express.Router();

authRouter.post(
  "/signup",
  ValidateRequestMiddleware(UserSchemaRegister),
  signUpController
);
authRouter.post(
  "/login",
  ValidateRequestMiddleware(UserSchemaLogin),
  loginController
);
