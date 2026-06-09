import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { BookAttributes } from "../interface/bookInterface";
import { buildListQuery } from "../utils/listQuery";
import { handleError } from "../utils/errorHandler";
import { ServiceError } from "../utils/errors";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await BookService.createBook(req.body, req.file?.path);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
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
      "Something went wrong on our end. The book could not be created. Please try again in a few minutes.",
    );
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const query = buildListQuery<BookAttributes>({
      req,
      searchableFields: [
        "title",
        "author",
        "created_at",
        "id",
        "image",
        "description",
        "quantity",
        "status",
        "updated_at",
      ],
      allowedSortFields: [
        "title",
        "author",
        "created_at",
        "id",
        "image",
        "description",
        "quantity",
        "status",
        "updated_at",
      ],
    });

    const { count, rows } = await BookService.getBooks({
      where: query.whereCondition,
      limit: query.limitNumber,
      offset: query.offset,
      order: [[query.sortField, query.normalizedOrder]],
    });

    return res.status(200).json({
      success: true,
      message: rows.length ? "Books fetched successfully" : "No books found",
      total: count,
      page: query.pageNumber,
      totalPages: Math.ceil(count / query.limitNumber),
      data: rows,
    });
  } catch (err) {
    handleError(
      err,
      res,
      "We are currently experiencing technical difficulties. Please try again shortly",
    );
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const book = await BookService.getBookById(id);

    res.json({
      success: true,
      message: "Book fetched successfully",
      data: book,
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
      "We are currently experiencing technical difficulties. Please try again shortly",
    );
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const book = await BookService.updateBook(id, req.body, req.file?.path);

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
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
      "The update could not be completed due to a temporary server issue.",
    );
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await BookService.deleteBook(id);

    res.json({
      success: true,
      message: "Book deleted successfully",
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
      "Try again in a few moments. The issue might be temporary",
    );
  }
};

