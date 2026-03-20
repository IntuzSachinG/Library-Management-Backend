import { Router } from "express";
import multer from "multer";
import {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

import { validate } from "../middlewares/validationMiddleware";
import { bookValidator } from "../validators/bookValidator";
// const upload = require("../middlewares/uploadMiddleware");

const router = Router();

const upload = multer({dest:"uploads/"});

router.post(
  "/admin/create-book",
  authenticate,
  adminOnly,
  upload.single("image"),
  bookValidator,
  validate,
  createBook,
);

router.get("/get-books", getBooks);
router.put(
  "/admin/update-book/:id",
  authenticate,
  adminOnly,
  validate,
  updateBook,
);
router.delete("/admin/delete-book/:id", authenticate, adminOnly, deleteBook);

export default router;
