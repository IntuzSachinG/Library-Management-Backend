import { Request, Response, NextFunction } from "express";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message:
        "Sorry! You Cannot Permit To Do This Kind Of Practice You Have Don't Access Contact Admin Panel",
    });
  }
  next();
};
