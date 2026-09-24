import { body } from "express-validator";

export const registerRules = [
  body("name").notEmpty().withMessage("Nama wajib diisi"),
  body("email").isEmail().withMessage("Format email tidak valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Konfirmasi password tidak cocok");
    }
    return true;
  }),
];

export const loginRules = [
  body("email").isEmail().withMessage("Format email tidak valid"),
  body("password").notEmpty().withMessage("Password wajib diisi"),
];
