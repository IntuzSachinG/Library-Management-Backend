import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import {
  BookAttributes,
  BookCreationAttributes,
} from "../interface/bookInterface";

export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: string;
  public title!: string;
  public author!: string;
  public status?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
