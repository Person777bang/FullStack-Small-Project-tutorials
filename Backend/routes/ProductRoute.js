import express from "express";
import { getProducts, createProduct, getCategories } from "../Controller/ProductController.js";

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/categories', getCategories);

export default router;