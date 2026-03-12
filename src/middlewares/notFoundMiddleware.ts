import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    success:false,
    // status: 404,
    message: "Sorry For In-Convienient The Page You Try To Find Not Available In Our Domain",
  });
};
