import * as likesDB from '../data/likes.data'
import ExpressReviewsError from '../utils/postableError.utils';

export async function getLikeByUserAndPost(userId:number, postId:number) {
  try {
    return await likesDB.getLikeByUserAndPost(userId, postId)
  } catch (error) {
    throw error
  }
}

export async function createLike(userId: number, postId: number) {
  try {
    const likeAlreadyExist = await likesDB.getLikeByUserAndPost(userId, postId)
    if (likeAlreadyExist) {
      throw new ExpressReviewsError(
        "El like ya existe",
        500,
        "ServiceError",
        Error
      );

    }
    return await likesDB.createLike(userId, postId)
  } catch (error) {
    throw error
  }
} 

export async function deleteLike(userId: number, postId: number) {
  try {
    const likeExist = await likesDB.getLikeByUserAndPost(userId, postId)
    if (!likeExist) {
      throw new ExpressReviewsError(
        "El like que quieres eliminar no existe",
        500,
        "ServiceError",
        Error
      );

    }
    return await likesDB.deleteLike(userId, postId)
  } catch (error) {
    throw error
  }
} 

