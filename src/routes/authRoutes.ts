import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validate } from "../middlewares/validationMiddleware";
const router = Router();

router.post("/register", validate, register);
router.post("/login", validate,login);

export default router;
