import { NextFunction, Request, Response } from "express";
import { createPost } from '../services/posts.service';
import { PostSchemaContent, PostSchemaWithDates, PostWithDatesAndUserId } from "../models/posts.model";

export const createPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.userId)
    const postDataParsed = PostSchemaWithDates.parse(PostSchemaContent.parse(req.body))
    const newPostData: PostWithDatesAndUserId = {userid: userId, ...postDataParsed}
    console.log(newPostData)
    const newPost = await createPost(newPostData)
    res.status(201).json({
      ok:true,
      message: "Post creado exitosamente",
      data: newPost
    })
  } catch (error) {
    next(error)
  }
};
