import { Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  // update this
  mobile?: string;
  //update this
  password: string;
  // update this
  gender?: "male" | "female" | "other";
  birthdate?: Date;
  status?: "active" | "inactive";
  // update this
  role?: "student" | "admin";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id"
> {}
