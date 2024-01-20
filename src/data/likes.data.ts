import { query } from "../db";
import { currentDateFormated } from "../utils/currentDate";
import ExpressReviewsError from "../utils/postableError.utils";

export async function getLikeByUserAndPost(userId: number, postId: number) {
  try {
    return (
      await query("SELECT * FROM likes WHERE postid = $1 AND userid = $2", [
        postId,
        userId,
      ])
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al obtener Like",
      500,
      "DataError",
      error,
      "getLikeByUserAndPost"
    );
  }
}

export async function createLike(userId: number, postId: number) {
  try {
    const createdAt = currentDateFormated();
    return await query(
      "INSERT INTO likes (postid, userid, createdat) VALUES ($1, $2, $3) RETURNING *",
      [postId, userId, createdAt]
    );
  } catch (error) {
    throw new ExpressReviewsError(
      "Error al crear nuevo like",
      500,
      "DataError",
      error,
      "createLike"
    );
  }
}
