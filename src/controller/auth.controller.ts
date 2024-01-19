import { NextFunction, Request, Response } from "express";
import { UserSchemaRegister } from "../models/user.model";
import bcrypt from "bcrypt";
import { costFactor } from "../utils/const.utils";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataParsed = UserSchemaRegister.parse(req.body);
    dataParsed.password = await bcrypt.hash(dataParsed.password, costFactor)
    const newUserData = UserSchema
  } catch (error) {
    next(error);
  }
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const {username, password} = req.body;
    
  }  catch (error) {

  }
}