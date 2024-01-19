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

export async function getUserByName(username: string):Promise<User> {
  try {
    const user = await userDB.getUserByName(username);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error")
    } 
    return user
  } catch (error) {
    throw error
  }
}
export async function getUserByNameAndEmail(username: string, email:string):Promise<User> {
  try {
    const user = await userDB.getUserByNameAndEmail(username, email);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error")
    } 
    return user
  } catch (error) {
    throw error
  }
}

export async function getUserById(userId: number):Promise<User> {
  try {
    const user = await userDB.getUserById(userId);
    if (!user) {
      throw new ExpressReviewsError("usuario no existe", 403, "service error")
    } 
    return user
  } catch (error) {
    throw error
  }
}