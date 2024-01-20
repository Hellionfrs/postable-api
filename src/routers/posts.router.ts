import express from "express";
import { createPostsController, editPostsController } from "../controller/posts.controller";
import { authenticateHandler } from "../middlewares/auth.middleware";

export const postsRouter = express.Router();

postsRouter.post("/", authenticateHandler, createPostsController);
postsRouter.patch("/:postId", authenticateHandler, editPostsController)