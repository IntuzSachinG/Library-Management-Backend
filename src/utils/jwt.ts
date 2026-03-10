import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "secretkey";

export const generateToken = (
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d",
): string => {
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

