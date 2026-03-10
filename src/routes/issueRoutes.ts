import {
  issueBook,
  returnBook,
  getUserIssues,
} from "../controllers/issueController";
import { authenticate } from "../middlewares/authMiddleware";
import {
  issueBookValidator,
  returnBookValidator,
} from "../validators/issueValidator";
import { validate } from "../middlewares/validationMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authenticate, issueBookValidator, validate, issueBook);

router.patch(
  "/:id/return",
  authenticate,
  returnBookValidator,
  validate,
  returnBook,
);

router.get("/", authenticate, getUserIssues);

export default router;
