import { Request, Response } from "express";
import { Book, Issue } from "../models";
import { BookAttributes } from "../interface/bookInterface";
import { buildListQuery } from "../utils/listQuery";
import { handleError } from "../utils/errorHandler";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, quantity, status } = req.body;

    const book = await Book.create({
      title,
      author,
      image: req.file!.filename,
      description,
      quantity,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
    // } catch (error: unknown) {
    //   console.error("Create book error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
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

    const { count, rows } = await Book.findAndCountAll({
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

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
    // } catch (error: unknown) {
    //   console.error("Get book error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
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

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const issuedCount = await Issue.count({
      where: {
        bookId: id,
        status: "issued",
      },
    });

    if (req.body.quantity !== undefined && req.body.quantity < issuedCount) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be less than issued books",
      });
    }

    await book.update(req.body);

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
    // } catch (error: unknown) {
    //   console.error("Update book error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
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

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const issuedBook = await Issue.findOne({
      where: {
        bookId: id,
        status: "issued",
      },
    });

    if (issuedBook) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete book. It is currently issued",
      });
    }

    await book.destroy();

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
    // } catch (error: unknown) {
    //   console.error("Delete book error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal server error",
    //   });
    // }
  } catch (err) {
    handleError(
      err,
      res,
      "Try again in a few moments. The issue might be temporary",
    );
  }
};
