import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getMyAddresses, createAddress, updateAddress, deleteAddress, setPrimaryAddress } from "../Controller/AddressController.js";

const router = express.Router();

router.get('/addresses', verifyToken, getMyAddresses);
router.post('/addresses', verifyToken, createAddress);
router.patch('/addresses/:id', verifyToken, updateAddress);
router.patch('/addresses/:id/primary', verifyToken, setPrimaryAddress);
router.delete('/addresses/:id', verifyToken, deleteAddress);

export default router;