import { Optional } from "sequelize";
export interface IssueAttributes {
  id: string;
  // update this
  bookId: string;
  // update this
  userId: string;
  // update this
  issueDate: Date;
  returnDate?: Date | null;
  // update this
  status: "issued" | "returned";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
export interface IssueCreationAttributes extends Optional<
  IssueAttributes,
  "id"
> {}
