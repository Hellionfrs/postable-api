import express from "express";
import { getUserProfileController } from "../controller/userProfile.controller";
import { authenticateHandler } from "../middlewares/auth.middleware";

export const userProfile = express.Router();

userProfile.get("/me", authenticateHandler,getUserProfileController)