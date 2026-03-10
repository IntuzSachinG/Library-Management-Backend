import { body } from "express-validator";


export const bookValidator = [
  body("title")
    .isString()
    .withMessage("Title Must Be String Only")
    .notEmpty()
    .withMessage("Title value cannot be empty"),
  body("author").isString().notEmpty().withMessage("author cannot be empty"),
  body("image").optional().notEmpty(),
  body("description").notEmpty(),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity Cannot be Negative"),
  body("status").optional().isIn(["available", "unavailable"]),
];
