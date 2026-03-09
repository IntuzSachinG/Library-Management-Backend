import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import {
  IssueAttributes,
  IssueCreationAttributes,
} from "../interface/issueInterface";

export class Issue
  extends Model<IssueAttributes, IssueCreationAttributes>
  implements IssueAttributes
{
  public id!: string;
  // update this
  public bookId!: string;
  // update this
  public userId!: string;
  public issueDate!: Date;
  public returnDate?: Date | null;
  // update this
  public status!: "issued" | "returned";
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;
}

Issue.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "books", key: "id" },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("issued", "returned"),
      allowNull: false,
      defaultValue: "issued",
    },
  },
  {
    sequelize,
    tableName: "issues",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
