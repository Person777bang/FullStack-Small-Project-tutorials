import express from "express";
import {
    getUsers,
    getUsersById,
    createUser,
    deleteUser,
    updateUser,
} from "../Controller/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router()

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUsersById);

router.post('/users', verifyToken, verifyAdmin, createUser);
router.patch('/users/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);

export default router;