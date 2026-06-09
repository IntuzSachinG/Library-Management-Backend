import { Issue, Book, User, sequelize } from "../models";
import { ServiceError } from "../utils/errors";

export class IssueService {
  static async issueBook(userId: string, bookId: string) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.findByPk(userId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!user || user.deleted_at !== null || user.status !== "active") {
        throw new ServiceError(403, "User account inactive or deleted");
      }

      const book = await Book.findByPk(bookId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!book || book.quantity <= 0) {
        throw new ServiceError(400, "Book not available");
      }

      if (book.quantity <= 0) {
        throw new ServiceError(400, "Book out of stock");
      }

      if (book.status === "unavailable") {
        throw new ServiceError(400, "Book Not Available");
      }

      const issuedCount = await Issue.count({
        where: { userId, status: "issued" },
        transaction,
      });

      if (issuedCount >= 3) {
        throw new ServiceError(400, "User cannot issue more than 3 books");
      }

      const existingIssue = await Issue.findOne({
        where: {
          userId,
          bookId,
          status: "issued",
        },
        transaction,
      });

      if (existingIssue) {
        throw new ServiceError(400, "You already issued this book");
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
      return issue;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  static async returnBook(id: string) {
    const transaction = await sequelize.transaction();
    try {
      const issue = await Issue.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!issue) {
        throw new ServiceError(404, "Issue record not found");
      }

      if (issue.status === "returned") {
        throw new ServiceError(400, "Book already returned");
      }

      const book = await Book.findByPk(issue.bookId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      issue.status = "returned";
      issue.returnDate = new Date();
      await issue.save({ transaction });

      if (book) {
        book.quantity += 1;
        await book.save({ transaction });
      }

      await transaction.commit();
      return issue;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  static async getUserIssues(options: {
    where: any;
    limit: number;
    offset: number;
    order: any;
  }) {
    const { count, rows } = await Issue.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Book,
          as: "book",
          attributes: ["id", "title", "author"],
        },
      ],
    });
    return { count, rows };
  }

  static async getMyIssues(userId: string) {
    const issues = await Issue.findAll({
      where: {
        userId,
        deleted_at: null,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Book,
          as: "book",
          attributes: ["id", "title", "image", "author"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return issues;
  }

  static async deleteIssue(id: string) {
    const issue = await Issue.findByPk(id);
    if (!issue) {
      throw new ServiceError(404, "Issue not found");
    }

    if (issue.status !== "returned") {
      throw new ServiceError(400, "Only returned books history can be deleted");
    }

    await issue.destroy();
    return true;
  }
}
