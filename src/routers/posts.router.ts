import express from "express";
import { createPostsController } from "../controller/posts.controller";
import { authenticateHandler } from "../middlewares/auth.middleware";

export const postsRouter = express.Router();

postsRouter.post("/", authenticateHandler, createPostsController);
