import express from "express";
import { register, login } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/admin", authenticate, adminOnly);

export default router;
