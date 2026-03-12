import { Request, Response } from "express";
import { User, Issue, Book } from "../models";
import { Op } from "sequelize";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      search,
      sort_by = "created_at",
      order = "desc",
    } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Page must be a number greater than 0",
      });
    }

    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "limit must be a number greater than 0",
      });
    }

    const offset = (pageNumber - 1) * limitNumber;

    const whereCondition: any = {
      deleted_at: null,
    };

    if (search) {
      whereCondition[Op.or] = [
        {
          name: { [Op.like]: `%${search}%` },
        },
        {
          email: { [Op.like]: `%${search}%` },
        },

        {
          id: { [Op.like]: `%${search}%` },
        },
        {
          mobile: { [Op.like]: `%${search}%` },
        },
        {
          gender: { [Op.like]: `%${search}%` },
        },
        {
          birthdate: { [Op.like]: `%${search}%` },
        },
        {
          status: { [Op.like]: `%${search}%` },
        },
        {
          role: { [Op.like]: `%${search}%` },
        },
      ];
    }

    const allowedSortFields = [
      "name",
      "email",
      "created_at",
      "id",
      "mobile",
      "gender",
      "birthdate",
      "status",
      "role",
    ];
    const sortField = allowedSortFields.includes(sort_by as string)
      ? sort_by
      : "created_at";

    const allowedOrders = ["asc", "desc"];
    const normalizedOrder = (order as string).toLowerCase();
    if (order && !allowedOrders.includes(normalizedOrder)) {
      return res.status(400).json({
        error: "Invalid sortOrder. Use 'asc' or 'desc'.",
      });
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset,
      order: [[sortField as string, normalizedOrder]],
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      total: count,
      page: pageNumber,
      totalPages: Math.ceil(count / limitNumber),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const userdetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const userDetail = await User.findByPk(id as string);
        return res.status(200).json({
            success: true,
            message: "user fetched successfully",
            data: userDetail,
        })
    } catch (error) {
        return res.status(500).json({
            succee: false,
            message: 'failed to fetch user',
            error,
        })
    }
}

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
