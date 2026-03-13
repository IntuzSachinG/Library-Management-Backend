import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { generateToken } from "../utils/jwt";
import { handleError } from "../utils/errorHandler";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mobile, gender, birthdate } = req.body;

    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      mobile,
      gender,
      birthdate,
    });

    const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: [user],
    });
    // } catch (error: unknown) {
    //   console.error("Register Error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
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

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.json({
      success: true,
      message: "Login Successfully",

      data: [user],
      token,
    });
    // } catch (error: unknown) {
    //   console.error("Login Error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "An unexpected error occurred. Please try again later.",
    );
  }
};
