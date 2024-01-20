import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/user.service";

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
