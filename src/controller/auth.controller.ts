import { NextFunction, Request, Response } from "express";
import { UserSchema, UserSchemaRegister } from "../models/user.model";
import bcrypt from "bcrypt";
import { costFactor } from "../utils/const.utils";
import { createUser } from "../services/user.service";
import { currentDateFormated } from "../utils/currentDate";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("reading req.body", req.body);
    const dataParsed = UserSchema.parse(UserSchemaRegister.parse(req.body));
    console.log(dataParsed);
    dataParsed.createdAt = currentDateFormated();
    dataParsed.updatedAt = currentDateFormated();
    dataParsed.password = await bcrypt.hash(dataParsed.password, costFactor);

    const newUser = await createUser(dataParsed);
    console.log("user created", newUser)
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
  } catch (error) {}
};
