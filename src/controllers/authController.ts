import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { ServiceError } from "../utils/errors";
import { handleError } from "../utils/errorHandler";

export const register = async (req: Request, res: Response) => {
  try {
    const { user } = await AuthService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: [user],
    });
  } catch (err: any) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    handleError(
      err,
      res,
      "Registration failed due to a technical issue. Please try again in a few minutes",
    );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      success: true,
      message: "Login Successfully",
      data: [user],
      token,
    });
  } catch (err: any) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    handleError(
      err,
      res,
      "An unexpected error occurred. Please try again later.",
    );
  }
};

