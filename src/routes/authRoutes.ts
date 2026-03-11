import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validate } from "../middlewares/validationMiddleware";
import { authValidator, registerValidator } from "../validators/userValidator";
const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", authValidator, validate, login);

export default router;
