// id SERIAL PRIMARY KEY,
//     userId INTEGER REFERENCES users(id) NOT NULL,
//     content TEXT NOT NULL,
//     createdAt VARCHAR(22) NOT NULL,
//     updatedAt VARCHAR(22) NOT NULL

import { query } from "../db";
import {
  Post,
  PostContent,
  PostFilterId,
  PostWithDatesAndUserId,
  QueryParams,
} from "../models/posts.model";
import { currentDateFormated } from "../utils/currentDate";
import ExpressReviewsError from "../utils/postableError.utils";
import { filtering, sorting } from "./utils.data";

export async function createPost(data: PostWithDatesAndUserId): Promise<Post> {
  try {
    return (
      await query(
        "INSERT INTO posts (userid, content, createdat, updatedat ) VALUES ($1, $2, $3, $4) RETURNING *;",
        [data.userid, data.content, data.createdat, data.updatedat]
      )
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al crear nuevo post",
      500,
      "DataError",
      error,
      "createPost"
    );
  }
}

export async function getPostById(postId: number): Promise<Post> {
  try {
    return (await query("SELECT * FROM posts WHERE id = $1;", [postId]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError("posts no existe", 403, "data error", error);
  }
}

export async function getPostByIdAndUserId(
  postId: number,
  userId: number
): Promise<Post> {
  try {
    return (
      await query("SELECT * FROM posts WHERE id = $1 AND userid = $2;", [
        postId,
        userId,
      ])
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError("posts no existe", 403, "data error", error);
  }
}

export async function editPost(
  postId: number,
  userId: number,
  data: PostContent
): Promise<Post> {
  try {
    const updatedAt = currentDateFormated();
    return (
      await query(
        `UPDATE posts SET content = $1, updatedat = $4 WHERE id = $2 AND userid = $3 RETURNING *;`,
        [data.content, postId, userId, updatedAt]
      )
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al editar post",
      500,
      "DataError",
      error,
      "editPost"
    );
  }
}

export async function editPostLikes(
  postId: number,
  userId: number,
  newCantLikes: number
) {
  try {
    const updatedAt = currentDateFormated();
    return (
      await query(
        `UPDATE posts SET likescount = $1, updatedat = $4 WHERE id = $2 AND userid = $3 RETURNING *;`,
        [newCantLikes, postId, userId, updatedAt]
      )
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al editar post likes",
      500,
      "DataError",
      error,
      "editPostLikes"
    );
  }
}

export async function getPostsFromDB(
  filters: PostFilterId = {},
  order: QueryParams["order"],
  page: QueryParams["page"],
  limit: QueryParams["limit"],
  orderBy: QueryParams["orderBy"]
) {
  try {
    let q = "SELECT * FROM posts";
    const queryParams: (string | boolean | number)[] = [];

    //filtering

    q = filtering(q, filters, queryParams);
    //sorting
    q = sorting(q, orderBy, order);

    if (page && limit) {
      const offset = (page - 1) * limit;
      q += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    const result = await query(q, queryParams);
    return result.rows;
  } catch (error) {
    throw new ExpressReviewsError(
      "Error mostrar posts",
      500,
      "DataError",
      error,
      "getPostsFromDB"
    );
  }
}

export async function getPostsCountFromDB(filters: PostFilterId = {}) {
  try {
    let q = "SELECT COUNT(*) FROM posts";
    const queryParams: (string | boolean | number)[] = [];
    q = filtering(q, filters, queryParams);

    const result = await query(q, queryParams);
    return Number(result.rows[0].count);
  } catch (error) {
    throw new ExpressReviewsError(
      "Error obteniendo cant de posts",
      500,
      "DataError",
      error,
      "getPostsCountFromDB"
    );
  }
}
