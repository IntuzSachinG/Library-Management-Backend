import { body } from "express-validator";

const mobile = /^\+?[1-9]\d{1,14}$/;

export const registerValidator = [
  body("name")
    .isString()
    .withMessage("Name Bust Be String Only...")
    .notEmpty()
    .withMessage("Name Field Cannot Be Empty"),
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("E-mail Field Cannot Be Empty"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Minimum length of password must be 6 digit or above"),
  body("mobile")
  .optional()
    .matches(mobile)
    .withMessage("Invalid mobile number format"),
  body("gender").isIn(["male", "female", "other"]),
  body("birthdate").isDate(),
];

export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("E-mail Is Compulsory"),
  body("password").notEmpty().withMessage("Password Is Compulsory"),
];
