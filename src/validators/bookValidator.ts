import { body } from "express-validator";

export const bookValidator = [
  body("title")
    .matches(/^[^0-9]+$/)
    .withMessage("Name cannot contain numbers")
    .notEmpty()
    .withMessage("Title value cannot be empty"),
  body("author")
    .matches(/^[^0-9]+$/)
    .withMessage("Name cannot contain numbers")
    .notEmpty()
    .withMessage("author cannot be empty"),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image field is required");
    }
    return true;
  }),
  body("description").notEmpty(),
  body("quantity")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Quantity Cannot be Negative"),
  body("status").optional().isIn(["available", "unavailable"]),
];
