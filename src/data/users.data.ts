import { query } from "../db";
import { User, UserData, UserEdit } from "../models/user.model";
import ExpressReviewsError from "../utils/postableError.utils";
import { objStringify } from "../utils/stringifyObject.utils";

export async function getUserByName(username: string): Promise<User> {
  try {
    return (await query("SELECT * FROM users WHERE username = $1;", [username]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function getUserById(userId: number): Promise<User> {
  try {
    return (await query("SELECT * FROM users WHERE id = $1;", [userId]))
      .rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "usuario no existe",
      403,
      "data error",
      error
    );
  }
}

export async function getUserByNameAndEmail(
  username: string,
  email: string
): Promise<User> {
  try {
    return (
      await query("SELECT * FROM users WHERE username = $1 AND email = $2;", [
        username,
        email,
      ])
    ).rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "Password no coincide con Username",
      403,
      "data error",
      error
    );
  }
}

export async function createUser(data: UserData): Promise<User> {
  try {
    const createdUser = await query(
      "INSERT INTO users (username, password, email, firstName, lastName, role, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        data.username,
        data.password,
        data.email,
        data.firstname,
        data.lastname,
        data.role,
        data.createdat,
        data.updatedat,
      ]
    );
    return createdUser.rows[0];
  } catch (error) {
    throw new ExpressReviewsError(
      "No se pudo crear usuario",
      403,
      "data error",
      error
    );
  }
}

export async function updateUser(userId: number, data:Partial<UserEdit>):Promise<User> {
  try {
    const dataStringify = objStringify(data)
    return (await query(`UPDATE users SET ${dataStringify} WHERE id = $1 RETURNING *;`, [userId])).rows[0]
  } catch (error) {
    throw new ExpressReviewsError(
      "No se pudo editar usuario",
      403,
      "data error",
      error
    );
  }
}
