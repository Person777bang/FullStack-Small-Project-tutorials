import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AddressRoute from "./routes/AddressRoute.js";
import db from "./config/Database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. KONEKSI & SINKRONISASI DATABASE (Aman dengan try-catch)
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully...");
    await db.sync();
  } catch (error) {
    console.error("Gagal terhubung ke Database:", error.message);
  }
})();

// 2. KONFIGURASI CORS (Mendukung Cookies/Session dari Frontend)
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. SERVE STATIC FILES (Absolute Path)
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// HEALTH CHECK ENDPOINT
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// ROUTING
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(AddressRoute);

// GLOBAL ERROR HANDLER
app.use((error, req, res, next) => {
  console.error("Server Error:", error.message);
  res.status(500).json({ msg: "Terjadi kesalahan pada server" });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`Server up and running on port ${PORT}...`),
  );
}

export default app;
