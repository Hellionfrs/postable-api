import express from "express";
import { createPostLikeController, createPostsController, deletePostLikeController, editPostsController, getAllPostController, getPostByNameController } from "../controller/posts.controller";
import { authenticateHandler } from "../middlewares/auth.middleware";

export const postsRouter = express.Router();

postsRouter.get("/", getAllPostController)
postsRouter.get("/:username", getPostByNameController)

postsRouter.post("/posts", authenticateHandler, createPostsController);
postsRouter.patch("/posts/:postId", authenticateHandler, editPostsController)

postsRouter.post("/posts/:postId/like", authenticateHandler, createPostLikeController)
postsRouter.delete("/posts/:postId/like", authenticateHandler, deletePostLikeController)