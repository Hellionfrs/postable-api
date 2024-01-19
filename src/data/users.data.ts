import { query } from "../db";
import { User, UserData } from "../models/user.model";
import ExpressReviewsError from "../utils/postableError.utils";

export async function getUserByName(
  username: string
): Promise<User> {
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

export async function createUser(data: UserData): Promise<User> {
  try {
    const createdUser = await query(
      "INSERT INTO users (username, password, email, firstName, lastName, role, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        data.username,
        data.password,
        data.email,
        data.firstName,
        data.lastName,
        data.role,
        data.createdAt,
        data.updatedAt,
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
