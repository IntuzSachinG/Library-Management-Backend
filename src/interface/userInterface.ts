import { Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  gender?: string;
  birthdate?: Date;
  status?: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id"
> {}
