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
  public mobile!: string;
  public password?: string;
  public gender?: string;
  public birthdate?: Date;
  public status?: string;
  public role?: string;

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

    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [1, 10],
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "male",
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString().split("T")[0],
      },
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
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
