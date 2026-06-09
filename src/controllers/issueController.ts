import { Request, Response } from "express";
import { IssueService } from "../services/issueService";
import { IssueAttributes } from "../interface/issueInterface";
import { buildListQuery } from "../utils/listQuery";
import { handleError } from "../utils/errorHandler";
import { ServiceError } from "../utils/errors";

export const issueBook = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const issue = await IssueService.issueBook(userId, bookId);

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: issue,
    });
  } catch (err: any) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    handleError(err, res, "Try again later,Contact Support");
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const issue = await IssueService.returnBook(id);

    res.json({
      success: true,
      message: "Book returned successfully",
      data: issue,
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
      "We're sorry, we can't process your return right now due to a temporary system issue. Please try again in a few minutes.",
    );
  }
};

export const getUserIssues = async (req: Request, res: Response) => {
  try {
    const query = buildListQuery<IssueAttributes>({
      req,
      searchableFields: ["status", "userId", "bookId", "id"],
      allowedSortFields: [
        "userId",
        "bookId",
        "status",
        "id",
        "created_at",
        "issueDate",
      ],
    });

    const { count, rows } = await IssueService.getUserIssues({
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
  } catch (err) {
    handleError(err, res, "Technical issue from server try after some time");
  }
};

export const getMyIssues = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const issues = await IssueService.getMyIssues(userId);

    return res.status(200).json({
      success: true,
      message: "User issues fetched successfully",
      data: issues,
    });
  } catch (err) {
    handleError(err, res, "Technical issue from server try after some time");
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await IssueService.deleteIssue(id);

    return res.json({
      message: "Issue history deleted successfully",
    });
  } catch (err: any) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }
    return res.status(500).json({
      message: "Server error",
    });
  }
};

