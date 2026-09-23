import express from "express";
import {
  register,
  login,
  registerAdmin,
} from "../Controller/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { validate } from "../middleware/Validate.js";
import { registerRules, loginRules } from "../Validator/AuthValidator.js";

const router = express.Router();

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.post(
  "/register-admin",
  verifyToken,
  verifyAdmin,
  registerRules,
  validate,
  registerAdmin,
);

export default router;
