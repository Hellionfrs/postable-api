import express from "express";
import {
  deleteUserController,
  editUserController,
  getUserProfileController,
} from "../controller/userProfile.controller";
import { authenticateHandler } from "../middlewares/auth.middleware";

export const userProfile = express.Router();

userProfile.get("/me", authenticateHandler, getUserProfileController);
userProfile.patch("/me", authenticateHandler, editUserController);
userProfile.delete("/me", authenticateHandler, deleteUserController)
