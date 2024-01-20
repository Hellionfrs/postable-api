import { Post, PostWithDatesAndUserId } from "../models/posts.model";
import * as postsDB from "../data/posts.data";

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
