import { NextFunction, Request, Response } from "express";
import ExpressReviewsError from "../utils/postableError.utils";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/const.utils";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

export const authenticateHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  if (!token) {
    return next(
      new ExpressReviewsError(
        "No autorizado",
        401,
        "error on authenticateHandler middleware"
      )
    );
  }
  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: number;
      userRole: string;
      iat: number;
      exp: number;
    };
    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (error) {
    next(new ExpressReviewsError("no autenticado", 403, "autenticacion error", error));
  }
};