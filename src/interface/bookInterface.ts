import { Optional } from "sequelize";

export interface BookAttributes {
  id: string;
  title: string;
  author: string;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface BookCreationAttributes extends Optional<
  BookAttributes,
  "id"
> {}
