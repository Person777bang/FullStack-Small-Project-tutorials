import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { validate } from "../middleware/Validate.js";
import { addressRules } from "../middleware/AddressValidator.js";
import {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setPrimaryAddress,
} from "../Controller/AddressController.js";

const router = express.Router();

router.get("/addresses", verifyToken, getMyAddresses);
router.post("/addresses", verifyToken, addressRules, validate, createAddress);
router.patch("/addresses/:id", verifyToken, updateAddress);
router.patch("/addresses/:id/primary", verifyToken, setPrimaryAddress);
router.delete("/addresses/:id", verifyToken, deleteAddress);

export default router;
