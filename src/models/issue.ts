import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import {sequelize} from '../config/database';
import { IssueAttributes, IssueCreationAttributes } from '../interface/issueInterface';




export class Issue extends Model<IssueAttributes, IssueCreationAttributes> implements IssueAttributes {
  public id!: string;
  public bookId?: string;
  public userId?: string;
  public issueDate?: Date;
  public returnDate?: Date | null;

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
      type:DataTypes.UUID,
      
      references: { model: 'books', key: 'id' },
    },
    userId: {
      type: DataTypes.UUID,
   
      references: { model: 'users', key: 'id' },
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
  },
  {
    sequelize,
    tableName: 'issues',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    
  }
);


