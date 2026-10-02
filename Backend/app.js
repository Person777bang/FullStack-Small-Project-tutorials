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

// 1. KONEKSI & SINKRONISASI DATABASE
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully...");
    await db.sync();
  } catch (error) {
    console.error("Gagal terhubung ke Database:", error.message);
  }
})();

// 2. KONFIGURASI CORS MULTI-ORIGIN (Mendukung Lokal & Production Vercel)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Mendukung jika frontend menggunakan Vite
  "https://full-stack-small-project-tutorials.vercel.app", // Domain Frontend Vercel Anda
  process.env.CLIENT_URL, // Variabel CLIENT_URL dari .env (jika ada)
].filter(Boolean); // Menghapus nilai undefined/null

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
  }),
);

// 3. MIDDLEWARE REQUEST PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. SERVE STATIC FILES (Absolute Path)
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// 5. HEALTH CHECK ENDPOINT
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// 6. ROUTING
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(AddressRoute);

// 7. GLOBAL ERROR HANDLER
app.use((error, req, res, next) => {
  console.error("Server Error:", error.message);
  res
    .status(500)
    .json({ msg: error.message || "Terjadi kesalahan pada server" });
});

// 8. SERVER LISTENER (Tidak dijalankan jika di lingkungan Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`Server up and running on port ${PORT}...`),
  );
}

export default app;
