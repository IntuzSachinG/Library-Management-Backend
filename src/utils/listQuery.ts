import { Request } from "express";
import { Op, WhereOptions } from "sequelize";

interface ListQueryOptions<T> {
  req: Request;
  searchableFields: string[];
  allowedSortFields: string[];
}

export const buildListQuery = <T>({
  req,
  searchableFields,
  allowedSortFields,
}: ListQueryOptions<T>) => {
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
    throw new Error("Page must be a number greater than 0");
  }

  if (isNaN(limitNumber) || limitNumber <= 0) {
    throw new Error("Limit must be a number greater than 0");
  }

  const offset = (pageNumber - 1) * limitNumber;

  let whereCondition: WhereOptions<T> = {};

  if (search) {
    whereCondition = {
      [Op.or]: searchableFields.map((field) => ({
        [field]: { [Op.like]: `%${search}%` },
      })),
    } as WhereOptions<T>;
  }

  const sortField = allowedSortFields.includes(sort_by as string)
    ? (sort_by as string)
    : "created_at";

  const normalizedOrder = (order as string).toLowerCase();
  const allowedOrders = ["asc", "desc"];

  if (!allowedOrders.includes(normalizedOrder)) {
    throw new Error("Invalid sortOrder. Use 'asc' or 'desc'.");
  }

  return {
    pageNumber,
    limitNumber,
    offset,
    whereCondition,
    sortField,
    normalizedOrder,
  };
};