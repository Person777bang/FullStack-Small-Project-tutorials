import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { validate } from "../middleware/Validate.js";
import { upload } from "../middleware/multer.js";
import { productRules } from "../middleware/ProductValidator.js";
import {
  getProducts,
  createProduct,
  getCategories,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controller/ProductController.js";

const router = express.Router();

router.get("/products", verifyToken, getProducts);
router.get("/products/:id", verifyToken, getProductById);
router.get("/categories", verifyToken, getCategories);

// URUTAN MULTER: upload.array() HARUS sebelum productRules & validate
router.post(
  "/products",
  verifyToken,
  verifyAdmin,
  upload.array("images", 5),
  productRules,
  validate,
  createProduct,
);

router.delete("/products/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
