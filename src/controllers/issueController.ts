import { Request, Response } from "express";
import { Issue, Book, User, sequelize } from "../models";
import { Op, WhereOptions } from "sequelize";
import { UserAttributes } from "../interface/userInterface";
import { IssueAttributes } from "../interface/issueInterface";
import { buildListQuery } from "../utils/listQuery";
import { handleError } from "../utils/errorHandler";

export const issueBook = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id;

    const { bookId } = req.body;

    const user = await User.findByPk(userId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!user || user.deleted_at !== null || user.status !== "active") {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "User account inactive or deleted",
      });
    }

    const book = await Book.findByPk(bookId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!book || book.quantity <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Book not available",
      });
    }

    if (book.quantity <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Book out of stock",
      });
    }

    const issuedCount = await Issue.count({
      where: { userId, status: "issued" },
      transaction,
    });

    if (issuedCount >= 3) {
      return res.status(400).json({
        success: false,
        message: "User cannot issue more than 3 books",
      });
    }

    const existingIssue = await Issue.findOne({
      where: {
        userId,
        bookId,
        status: "issued",
      },
    });

    if (existingIssue) {
      return res.status(400).json({
        success: false,
        message: "You already issued this book",
      });
    }

    const issue = await Issue.create(
      {
        userId,
        bookId,
        status: "issued",
        issueDate: new Date(),
      },
      { transaction },
    );

    book.quantity -= 1;
    await book.save({ transaction });

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: issue,
    });
  } catch (err) {
    handleError(err, res, "Try again later,Contact Support");
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const issue = await Issue.findByPk(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue record not found",
      });
    }

    if (issue.status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Book already returned",
      });
    }

    const book = await Book.findByPk(issue.bookId);

    issue.status = "returned";
    issue.returnDate = new Date();

    await issue.save();

    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.json({
      success: true,
      message: "Book returned successfully",
      data: issue,
    });
    // } catch (error: unknown) {
    //   console.error("Return book error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "We're sorry, we can't process your return right now due to a temporary system issue. Please try again in a few minutes.",
    );
  }
};

export const getUserIssues = async (req: Request, res: Response) => {
  try {
    const query = buildListQuery<IssueAttributes>({
      req,
      searchableFields: ["status", "userId", "bookId", "id"],
      allowedSortFields: ["userId", "bookId", "status", "id"],
    });

    const { count, rows } = await Issue.findAndCountAll({
      where: query.whereCondition,
      limit: query.limitNumber,
      offset: query.offset,
      order: [[query.sortField, query.normalizedOrder]],
    });

    return res.status(200).json({
      success: true,
      message: "Issues fetched successfully",
      total: count,
      page: query.pageNumber,
      totalPages: Math.ceil(count / query.limitNumber),
      data: rows,
    });
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({
    //       success: false,
    //       message: error.message,
    //     });
    //   }
    // }
  } catch (err) {
    handleError(err, res, "Technical issue from server try after some time");
  }
};

export const getMyIssues = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const issues = await Issue.findAll({
      where: {
        userId: userId,
        deleted_at: null,
      },
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["id", "title", "image", "author"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "User issues fetched successfully",
      data: issues,
    });
    // } catch (error: unknown) {
    //   console.error("Get my issues error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(err, res, "Technical issue from server try after some time");
  }
};
