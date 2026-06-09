import { User, Issue, Book } from "../models";
import { ServiceError } from "../utils/errors";
import { UserAttributes } from "../interface/userInterface";

export class UserService {
  static async getUsers(options: {
    where: any;
    limit: number;
    offset: number;
    order: any;
  }) {
    const { count, rows } = await User.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
    });
    return { count, rows };
  }

  static async getUserById(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ServiceError(404, "User not found");
    }
    return user;
  }

  static async getUserWithBooks(id: string) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Issue,
          as: "issues",
          include: [{ model: Book, as: "book" }],
        },
      ],
    });

    if (!user) {
      throw new ServiceError(404, "User not found");
    }

    return user;
  }

  static async updateUser(id: string, data: Partial<UserAttributes>) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ServiceError(404, "User not found");
    }

    await user.update(data);
    return user;
  }

  static async updateUserStatus(id: string, status: "active" | "inactive") {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ServiceError(404, "User not found");
    }

    user.status = status;
    await user.save();
    return user;
  }

  static async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ServiceError(404, "User not found");
    }

    await user.destroy();
    return true;
  }
}
