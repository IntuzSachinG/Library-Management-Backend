import { body } from "express-validator";

export const issueBookValidator = [
  // body("userId")
  //   .notEmpty()
  //   .withMessage("User ID is required")
  //   .isUUID()
  //   .withMessage("User ID must be a valid UUID"),

  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isUUID()
    .withMessage("Book ID must be a valid UUID"),
];

export const returnBookValidator = [
  body("status")
    .optional()
    .isIn(["issued", "returned"])
    .withMessage("Status must be 'issued' or 'returned'")
];
