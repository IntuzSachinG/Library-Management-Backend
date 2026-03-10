import { Request, Response } from "express";
import { Book } from "../models";
import { Op } from "sequelize";
import cloudinary from "../config/cloudinary";

export const getBooks = async (req: Request, res: Response) => {
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
          title: { [Op.like]: `%${search}%` },
        },
        {
          author: { [Op.like]: `%${search}%` },
        },
      ];
    }

    const allowedSortFields = ["title", "author", "created_at"];
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

    const { count, rows } = await Book.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset,
      order: [[sortField as string, normalizedOrder]],
    });

    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
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

export const getBookById = async (req: Request, res: Response) => {
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
};

export const createBook = async (req: any, res: Response) => {
    const{title,author,description,quantity,status} = req.body;

 const result = await cloudinary.uploader.upload(req.file.path);

  // const book = await Book.create(req.body);
    const book = await Book.create({
      title,
      author,
      image:result.secure_url,
      description,
      quantity,
      status
    });

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const book = await Book.findByPk(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  await book.update(req.body);

  res.json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const book = await Book.findByPk(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  await book.destroy();

  res.json({
    success: true,
    message: "Book deleted successfully",
  });
};
