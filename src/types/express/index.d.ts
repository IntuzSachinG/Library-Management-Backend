import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: Express.Multer.File;
    }
  }
}
