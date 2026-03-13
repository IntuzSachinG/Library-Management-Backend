import { Request, Response } from "express";
import { User, Issue, Book } from "../models";
import { UserAttributes } from "../interface/userInterface";
import { buildListQuery } from "../utils/listQuery";
import { handleError } from "../utils/errorHandler";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const query = buildListQuery<UserAttributes>({
      req,
      searchableFields: [
        "name",
        "email",
        "id",
        "mobile",
        "gender",
        "birthdate",
        "status",
        "role",
      ],
      allowedSortFields: [
        "name",
        "email",
        "created_at",
        "id",
        "mobile",
        "gender",
        "birthdate",
        "status",
        "role",
      ],
    });

    const { count, rows } = await User.findAndCountAll({
      where: query.whereCondition,
      limit: query.limitNumber,
      offset: query.offset,
      order: [[query.sortField, query.normalizedOrder]],
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      total: count,
      page: query.pageNumber,
      totalPages: Math.ceil(count / query.limitNumber),
      data: rows,
    });
    // } catch (error: unknown) {
    //   console.error("Get users error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "An internal system error occurred while fetching user data.",
    );
  }
};

export const userdetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userDetail = await User.findByPk(id as string);
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: userDetail,
    });
    // } catch (error: unknown) {
    //   console.error("Get user details error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "An internal system error occurred while fetching user data.",
    );
  }
};

export const getUserWithBooks = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

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
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
    // } catch (error: unknown) {
    //   console.error("Get user with books error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "Unable to fetch user data due to a temporary backend issue. Please retry.",
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.update(req.body);

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
    // } catch (error: unknown) {
    //   console.error("Update user error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "Unable to update user data due to a temporary backend issue. Please retry.",
    );
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = req.body.status;

    await user.save();

    res.json({
      success: true,
      message: "Status updated successfully",
    });
    // } catch (error: unknown) {
    //   console.error("Update user status error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "Unable to update user data status due to a temporary backend issue. Please retry.",
    );
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: "User deleted successfully",
    });
    // } catch (error: unknown) {
    //   console.error("Delete user error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "Unable to delete user data due to a temporary backend issue. Please retry.",
    );
  }
};
