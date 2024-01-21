import { NextFunction, Request, Response } from "express";
import {
  createPost,
  editPost,
  editPostLikes,
  getPosts,
  getPostsCount,
} from "../services/posts.service";
import {
  PostContent,
  PostFilterId,
  PostSchemaContent,
  PostSchemaContentEdit,
  PostSchemaWithDates,
  PostWithDatesAndUserId,
  QuerySchema,
} from "../models/posts.model";
import { createLike, deleteLike } from "../services/likes.service";
import { getPostById } from "../data/posts.data";
import { getUserByName } from "../services/user.service";


export const createPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.userId);
    const postDataParsed = PostSchemaWithDates.parse(
      PostSchemaContent.parse(req.body)
    );
    const newPostData: PostWithDatesAndUserId = {
      userid: userId,
      ...postDataParsed,
    };
    console.log(newPostData);
    const newPost = await createPost(newPostData);
    res.status(201).json({
      ok: true,
      message: "Post creado exitosamente",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const editPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 200 actualizado exitosamente
    // 400 bad request
    // 401 unauthorized (no es propietario o no esta autenticado)
    // 404 si no existe
    const userId = Number(req.userId);
    const username = req.username;
    console.log(username, userId, req);
    const postId = Number(req.params["postId"]);
    const postData = PostSchemaContentEdit.parse(req.body) as PostContent;
    const { userid, likescount, ...updatedPost } = await editPost(
      postId,
      userId,
      postData
    );
    res.status(201).json({
      ok: true,
      message: "Post editado exitosamente",
      data: { ...updatedPost, username, likescount },
    });
  } catch (error) {
    next(error);
  }
};

export const createPostLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // tenemos el userId, username del login
    const userId = Number(req.userId);
    const username = req.username;
    // tenemos postId del req.params["postId"]
    const postId = Number(req.params["postId"]);
    const post = await getPostById(postId);
    post.likescount += 1;
    // crear like en likes y actualizar el posts.likescount
    await createLike(userId, postId); // edita la tabla likes
    console.log(userId, postId, post.likescount);
    const { userid, likescount, ...postLiked } = await editPostLikes(
      postId,
      userId,
      post.likescount
    );
    res.status(201).json({
      ok: true,
      message: "Post likeado exitosamente",
      data: { ...postLiked, username, likescount },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePostLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // tenemos el userId, username del login
    const userId = Number(req.userId);
    const username = req.username;
    // tenemos postId del req.params["postId"]
    const postId = Number(req.params["postId"]);
    const post = await getPostById(postId);
    // crear like en likes y actualizar el posts.likescount
    await deleteLike(userId, postId); // edita la tabla likes
    post.likescount -= 1;
    console.log(userId, postId, post.likescount);
    const { userid, likescount, ...postLiked } = await editPostLikes(
      postId,
      userId,
      post.likescount
    );
    res.status(201).json({
      ok: true,
      message: "Like eliminado exitosamente",
      data: { ...postLiked, username, likescount },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // query params `page` `limit` `filter -> username` `orderBy` (createAt o likesCount) y `order`
    const { username, order, page, limit, orderBy } = QuerySchema.parse(
      req.query
    );
    const filters: PostFilterId  = {};
    if (username) {
      const user = await getUserByName(username);
      filters["userid"] = user.id
    }

    const posts = await getPosts(filters, order, page, limit, orderBy);

    //pagination
    const totalItems = await getPostsCount(filters);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      ok: true,
      data: posts,
      pagination: {
        page,
        pageSize: limit,
        totalItems,
        totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPostByNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
