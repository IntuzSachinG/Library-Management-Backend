import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

interface JWTPayload {
  id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    // const decoded: any = jwt.verify(token, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const user = await User.findByPk(decoded.id);
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
