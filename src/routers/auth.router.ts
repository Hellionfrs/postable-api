import express from "express";
import { loginController, signUpController } from "../controller/auth.controller";

export const authRouter = express.Router();

authRouter.post("/register", signUpController);
authRouter.post("/login", loginController);
