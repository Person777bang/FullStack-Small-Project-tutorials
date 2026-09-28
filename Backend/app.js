import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import dotenv from "dotenv";
import AddressRoute from "./routes/AddressRoute.js";
import db from "./config/Database.js";

dotenv.config();

const app = express();

(async () => {
  await db.sync({ alter: true });
})();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(AddressRoute);

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).json({ msg: "Terjadi kesalahan pada server" });
});

app.listen(5000, () => console.log("Server dijalankan..."));
