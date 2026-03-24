import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validate } from "../middlewares/validationMiddleware";
import { authValidator, registerValidator } from "../validators/userValidator";
import { authenticate } from "../middlewares/authMiddleware";
const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", authValidator, validate, login);


router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user, 
  });
});


router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out",
  });
});


export default router;
