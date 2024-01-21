import {
  Post,
  PostContent,
  PostFilterId,
  PostWithDatesAndUserId,
  QueryParams,
} from "../models/posts.model";
import * as postsDB from "../data/posts.data";
import ExpressReviewsError from "../utils/postableError.utils";

export async function createPost(
  postData: PostWithDatesAndUserId
): Promise<Post> {
  try {
    const postCreated = await postsDB.createPost(postData);
    return postCreated;
  } catch (error) {
    throw error;
  }
}

export async function editPost(
  postId: number,
  userId: number,
  data: PostContent
): Promise<Post> {
  try {
    const post = await postsDB.getPostById(postId);
    if (!post) {
      throw new ExpressReviewsError(
        "El post no existe",
        400,
        "ServiceError",
        Error
      );
    }
    const postWithUser = await postsDB.getPostByIdAndUserId(postId, userId);
    if (!postWithUser) {
      throw new ExpressReviewsError(
        "No puede editar post de otros usuarios",
        401,
        "ServiceError",
        Error
      );
    }
    return await postsDB.editPost(postId, userId, data);
  } catch (error) {
    throw error;
  }
}

export async function editPostLikes(
  postId: number,
  userId: number,
  newCantLikes: number
): Promise<Post> {
  try {
    const post = await postsDB.getPostById(postId);
    if (!post) {
      throw new ExpressReviewsError(
        "El post no existe",
        400,
        "ServiceError",
        Error
      );
    }
    return await postsDB.editPostLikes(postId, userId, newCantLikes);
  } catch (error) {
    throw error;
  }
}

export async function getPosts(filters: PostFilterId, order: QueryParams['order'], page: QueryParams['page'], limit: QueryParams['limit'], orderBy: QueryParams['orderBy']) {
  try {
    return postsDB.getPostsFromDB(filters, order, page, limit, orderBy)
  } catch (error) {
    throw error;
  }
};

export async function getPostsCount(filters: PostFilterId) {
  try {
    return postsDB.getPostsCountFromDB(filters)
  } catch (error) {
    throw error;
  }
};
