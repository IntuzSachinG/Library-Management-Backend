import { Response } from "express";

export const handleError = (err: unknown, res: Response, context?: string) => {
  res.status(500).json({
    success: false,
    msg: `${context ?? "Error"}`,
    error: (err as Error).message,
  });
};
