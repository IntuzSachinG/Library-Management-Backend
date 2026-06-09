import bcrypt from "bcryptjs";
import { User } from "../models";
import { generateToken } from "../utils/jwt";
import { ServiceError } from "../utils/errors";
import { UserAttributes } from "../interface/userInterface";

export class AuthService {
  static async register(data: Partial<UserAttributes>) {
    const { name, email, password, mobile, gender, birthdate } = data;

    if (!email || !password) {
      throw new ServiceError(400, "Email and password are required");
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new ServiceError(400, "Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name!,
      email,
      password: hashed,
      mobile,
      gender,
      birthdate,
    });

    const token = generateToken({ id: user.id, role: user.role });

    return { user, token };
  }

  static async login(email?: string, password?: string) {
    if (!email || !password) {
      throw new ServiceError(400, "Email and password are required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ServiceError(400, "Invalid Credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ServiceError(400, "Invalid Credentials");
    }

    const token = generateToken({ id: user.id, role: user.role });

    return { user, token };
  }
}
