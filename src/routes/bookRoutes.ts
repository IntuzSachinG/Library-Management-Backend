import { Router } from "express";
import {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

import { validate } from "../middlewares/validationMiddleware";


const router = Router();
router.post("/", authenticate, adminOnly,  validate, createBook);
router.get("/", authenticate, getBooks);
// router.get("/", getBooks);
router.put("/:id", authenticate, adminOnly, validate, updateBook);
router.delete("/:id", authenticate, adminOnly, deleteBook);

export default router;