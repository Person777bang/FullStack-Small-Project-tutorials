import { body } from "express-validator";

export const productRules = [
  body("name").notEmpty().withMessage("Nama produk wajib diisi"),
  body("price").isFloat({ min: 0 }).withMessage("Harga tidak boleh negatif"),
  body("stock").isInt({ min: 0 }).withMessage("Stock tidak boleh negatif"),
  body("categoryId").notEmpty().withMessage("Kategori wajib dipilih"),
];
