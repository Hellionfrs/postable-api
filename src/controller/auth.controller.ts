import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { UserSchema, UserSchemaRegister } from "../models/user.model";
import bcrypt from "bcrypt";
import { costFactor, jwtSecret } from "../utils/const.utils";
import { createUser } from "../services/user.service";
import { getUserByNameAndEmail } from "../data/users.data";
import ExpressReviewsError from '../utils/postableError.utils';
import 'dotenv/config' 
// import { currentDateFormated } from "../utils/currentDate";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataParsed = UserSchema.parse(UserSchemaRegister.parse(req.body));
    dataParsed.password = await bcrypt.hash(dataParsed.password, costFactor);
    const newUser = await createUser(dataParsed);

    res.status(201).json({
      ok: true,
      message: "Register exitoso",
      data: {
        username: newUser.username,
        email: newUser.email,
        firstName: dataParsed.firstName,
        lastName: dataParsed.lastName,
        createdAt: dataParsed.createdAt,
        updatedAt: dataParsed.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const {username, password} = req.body;
    const {username, password, email} = req.body;
    const user = await getUserByNameAndEmail(username, email);
    const validPass = await bcrypt.compare(password, user.password);

    if (validPass) {
      const payload = { userId: user.id, userRole: user.role};
      const token = jwt.sign(payload, jwtSecret, {expiresIn: "10h"})
      res.json({ok: true, message: "Login exitoso", data: {token}})
    } else {
      throw new ExpressReviewsError(
        "password doesn't match with username or email",
        403,
        "Error at controllers"
      );
    }

  } catch (error) {
    next(error)
  }
};
