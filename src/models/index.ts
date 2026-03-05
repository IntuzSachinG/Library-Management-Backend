import { User } from "./user";
import { Book } from "./book";
import { Issue } from "./issue";
import { sequelize } from "../config/database";

User.hasMany(Issue, { foreignKey: "userId", as: "issues" });
Issue.belongsTo(User, { foreignKey: "userId", as: "user" });

Book.hasMany(Issue, { foreignKey: "bookId", as: "issues" });
Issue.belongsTo(Book, { foreignKey: "bookId", as: "book" });

export { User, Book, Issue, sequelize };
