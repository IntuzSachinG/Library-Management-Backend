import { Router } from "express";
import {
  getUsers,
  getUserWithBooks,
  updateUser,
  updateUserStatus,
  deleteUser,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

const router = Router();
router.get("/", authenticate, adminOnly, getUsers);
router.get("/:id", authenticate, adminOnly, getUserWithBooks);
router.put("/:id", authenticate, adminOnly, updateUser);
router.patch("/:id/status", authenticate, adminOnly, updateUserStatus);
router.delete("/:id", authenticate, adminOnly, deleteUser);

export default router;
