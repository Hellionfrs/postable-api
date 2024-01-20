// id SERIAL PRIMARY KEY,
//     userId INTEGER REFERENCES users(id) NOT NULL,
//     content TEXT NOT NULL,
//     createdAt VARCHAR(22) NOT NULL,
//     updatedAt VARCHAR(22) NOT NULL

import { query } from "../db";
import { Post, PostWithDatesAndUserId } from "../models/posts.model";
import ExpressReviewsError from "../utils/postableError.utils";

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
