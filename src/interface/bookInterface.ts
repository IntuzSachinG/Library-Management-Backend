import { Optional } from "sequelize";

export interface BookAttributes {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  quantity: number;
  // update this
  status?: "available" | "unavailable";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface BookCreationAttributes extends Optional<
  BookAttributes,
  "id"
> {}
