import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import {
  UserAttributes,
  UserCreationAttributes,
} from "../interface/userInterface";

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  // update this
  public mobile?: string;
  // update this
  public password!: string;
  // update this
  public gender?: "male" | "female" | "other";
  public birthdate?: Date;
  // update this
  public status?: "active" | "inactive";
  // update this
  public role?: "student" | "admin";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // update this
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
        // len: [10, 10],
        is: /^\+?[1-9]\d{1,14}$/,
      },
    },
    // update this
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // update this
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    // update this
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    // update this
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    // update this
    role: {
      type: DataTypes.ENUM("student", "admin"),
      allowNull: false,
      defaultValue: "student",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
