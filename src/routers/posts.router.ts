import express from "express";
import { createPostLikeController, createPostsController, deletePostLikeController, editPostsController } from "../controller/posts.controller";
import { authenticateHandler } from "../middlewares/auth.middleware";

export const postsRouter = express.Router();

postsRouter.post("/", authenticateHandler, createPostsController);
postsRouter.patch("/:postId", authenticateHandler, editPostsController)
postsRouter.post("/:postId/like", authenticateHandler, createPostLikeController)
postsRouter.delete("/:postId/like", authenticateHandler, deletePostLikeController)