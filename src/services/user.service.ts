import * as userDB from "../data/users.data";
import { User, UserData } from "../models/user.model";
import ExpressReviewsError from "../utils/postableError.utils";

export async function createUser(data:UserData):Promise<User> {
  const {username} = data;
  try {
    const user = await userDB.getUserByName(username);
    if (user) {
      throw new ExpressReviewsError("usuario ya existe", 403, "service error")
    }
    const userCreated = await userDB.createUser(data)
    return userCreated
  } catch(error) {
    throw error
  }
}