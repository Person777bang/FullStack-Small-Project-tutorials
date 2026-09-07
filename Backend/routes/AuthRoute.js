import express from "express";
import { register, login, registerAdmin } from "../Controller/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post("/register-admin", verifyToken, verifyAdmin, registerAdmin);

export default router;