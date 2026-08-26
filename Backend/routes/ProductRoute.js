import express from "express";
import { getProducts, createProduct, getCategories, getProductById, deleteProduct } from "../Controller/ProductController.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.get('/categories', getCategories);
router.delete('/products/:id', deleteProduct);

export default router;