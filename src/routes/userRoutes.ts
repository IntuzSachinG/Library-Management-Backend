import { Router } from "express";
import {
  getUsers,
  getUserWithBooks,
  updateUser,
  updateUserStatus,
  deleteUser,
  userdetail,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/admin/check-user-related-info", authenticate, adminOnly, getUsers);
// router.get("/admin/check-user-detail/:id", authenticate, adminOnly, getUsers);
router.get("/check-own-user-detail/:id", authenticate,  userdetail);
router.get("/:id", authenticate, adminOnly, getUserWithBooks);
router.put("/admin-update-user-details/:id", authenticate, adminOnly, updateUser);
router.patch("/admin-user-status-update/:id/status", authenticate, adminOnly, updateUserStatus);
router.delete("/admin/delete-user/:id", authenticate, adminOnly, deleteUser);

export default router;
