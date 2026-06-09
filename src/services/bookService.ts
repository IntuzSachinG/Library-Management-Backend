import { Book, Issue } from "../models";
import { ServiceError } from "../utils/errors";
import { BookAttributes } from "../interface/bookInterface";
import cloudinary from "../config/cloudinary";

export class BookService {
  static async createBook(data: Partial<BookAttributes>, filePath?: string) {
    let imageUrl = data.image || "";

    if (filePath) {
      const result = await cloudinary.uploader.upload(filePath);
      imageUrl = result.secure_url;
    }

    const book = await Book.create({
      title: data.title!,
      author: data.author!,
      image: imageUrl,
      description: data.description!,
      quantity: data.quantity!,
      status: data.status,
    });

    return book;
  }

  static async getBooks(options: {
    where: any;
    limit: number;
    offset: number;
    order: any;
  }) {
    const { count, rows } = await Book.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
    });
    return { count, rows };
  }

  static async getBookById(id: string) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new ServiceError(404, "Book not found");
    }
    return book;
  }

  static async updateBook(
    id: string,
    data: Partial<BookAttributes>,
    filePath?: string,
  ) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new ServiceError(404, "Book not found");
    }

    if (filePath) {
      const result = await cloudinary.uploader.upload(filePath);
      data.image = result.secure_url;
    }

    if (data.quantity !== undefined) {
      const issuedCount = await Issue.count({
        where: {
          bookId: id,
          status: "issued",
        },
      });

      if (data.quantity < issuedCount) {
        throw new ServiceError(400, "Quantity cannot be less than issued books");
      }
    }

    await book.update(data);
    return book;
  }

  static async deleteBook(id: string) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new ServiceError(404, "Book not found");
    }

    const issuedBook = await Issue.findOne({
      where: {
        bookId: id,
        status: "issued",
      },
    });

    if (issuedBook) {
      throw new ServiceError(400, "Cannot delete book. It is currently issued");
    }

    await book.destroy();
    return true;
  }
}
