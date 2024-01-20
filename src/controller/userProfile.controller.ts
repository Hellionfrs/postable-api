import { NextFunction, Request, Response } from "express";
import { getUserById, updateUser } from "../services/user.service";
import { UserSchemaEdit } from "../models/user.model";

export const getUserProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.userId);
    const { password, ...user } = await getUserById(id);
    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const editUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.userId);
    const data = UserSchemaEdit.parse(req.body)
    console.log(data)
    const {password, ...updatedUser} = await updateUser(id, data)
    res.status(200).json({
      ok: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
