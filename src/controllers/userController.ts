import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserAttributes } from "../interface/userInterface";
import { buildListQuery } from "../utils/listQuery";
import { handleError } from "../utils/errorHandler";
import { ServiceError } from "../utils/errors";

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

    const { count, rows } = await UserService.getUsers({
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
    const id = String(req.params.id);
    const userDetail = await UserService.getUserById(id);

    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: userDetail,
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
      "An internal system error occurred while fetching user data.",
    );
  }
};

export const getUserWithBooks = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const user = await UserService.getUserWithBooks(id);

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
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
      "Unable to fetch user data due to a temporary backend issue. Please retry.",
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const user = await UserService.updateUser(id, req.body);

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
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
      "Unable to update user data due to a temporary backend issue. Please retry.",
    );
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await UserService.updateUserStatus(id, req.body.status);

    res.json({
      success: true,
      message: "Status updated successfully",
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
      "Unable to update user data status due to a temporary backend issue. Please retry.",
    );
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await UserService.deleteUser(id);

    res.json({
      success: true,
      message: "User deleted successfully",
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
      "Unable to delete user data due to a temporary backend issue. Please retry.",
    );
  }
};

