import { body } from "express-validator";

export const addressRules = [
  body("label").notEmpty().withMessage("Label alamat wajib diisi"),
  body("recipientName").notEmpty().withMessage("Nama penerima wajib diisi"),
  body("phone").notEmpty().withMessage("No. telepon wajib diisi"),
  body("fullAddress").notEmpty().withMessage("Alamat lengkap wajib diisi"),
  body("city").notEmpty().withMessage("Kota wajib diisi"),
  body("postalCode").notEmpty().withMessage("Kode pos wajib diisi"),
];
