import { Optional } from "sequelize";

export interface IssueAttributes {
  id: string;
  bookId?: string;
  userId?: string;
  issueDate?: Date;
  returnDate?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface IssueCreationAttributes extends Optional<
  IssueAttributes,
  "id"
> {}
