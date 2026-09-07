import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { getProducts, createProduct, getCategories, getProductById, deleteProduct } from "../Controller/ProductController.js";

const router = express.Router();

router.get('/products', verifyToken, getProducts);
router.get('/products/:id', verifyToken, getProductById);
router.get('/categories', verifyToken, getCategories);

router.post('/products', verifyToken, verifyAdmin, createProduct);
router.delete('/products/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;