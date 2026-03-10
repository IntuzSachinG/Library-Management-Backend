import { Request, Response } from "express";
import { Issue, Book } from "../models";
import { Op } from "sequelize";

export const issueBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  const issuedCount = await Issue.count({
    where: { userId, status: "issued" },
  });

  if (issuedCount >= 3) {
    return res.status(400).json({
      success: false,
      message: "User cannot issue more than 3 books",
    });
  }

  const issue = await Issue.create({
    userId,
    bookId,
    status: "issued",
    issueDate: new Date(),
  });

  res.status(201).json({
    success: true,
    message: "Book issued successfully",
    data: issue,
  });
};

export const returnBook = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const issue = await Issue.findByPk(id);

  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "Issue record not found",
    });
  }

  issue.status = "returned";
  issue.returnDate = new Date();

  await issue.save();

  res.json({
    success: true,
    message: "Book returned successfully",
    data: issue,
  });
};

export const getUserIssues = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      status,
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

    if (status !== undefined) {
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status Cannot be empty",
        });
      }
      whereCondition.status = status;
    }

    if (search) {
      whereCondition[Op.or] = [
        {
          status: { [Op.like]: `%${search}%` },
        },
      ];
    }

    const allowedSortFields = ["userId", "bookId", "status"];
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

    const { count, rows } = await Issue.findAndCountAll({
      // where: whereCondition,
      where: {
        ...whereCondition,
        userId: req.user.id,
      },
      limit: limitNumber,
      offset,
      order: [[sortField as string, normalizedOrder]],
    });

    return res.status(200).json({
      success: true,
      message: "Issues fetched successfully",
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
