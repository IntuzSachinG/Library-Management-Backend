import { Router } from "express";
import {
  issueBook,
  returnBook,
  getUserIssues,
  getMyIssues,
} from "../controllers/issueController";
import { authenticate } from "../middlewares/authMiddleware";
import {
  issueBookValidator,
  returnBookValidator,
} from "../validators/issueValidator";
import { validate } from "../middlewares/validationMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

const router = Router();

router.post(
  "/user-issue-book",
  authenticate,
  issueBookValidator,
  validate,
  issueBook,
);

router.patch(
  "/user-return-book/:id/return",
  authenticate,
  returnBookValidator,
  validate,
  returnBook,
);

// router.get("/", authenticate, getUserIssues);
router.get("/", authenticate, adminOnly, getUserIssues);
router.get("/user-see-issue-book-record", authenticate, getMyIssues);

export default router;
