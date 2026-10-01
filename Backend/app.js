import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import AddressRoute from "./routes/AddressRoute.js";
import db from "./config/Database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

(async () => {
  await db.sync({ alter: true });
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PEMBETULAN: express.static dipanggil sebagai fungsi -> express.static("public/images")
app.use("/images", express.static("public/images"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(AddressRoute);

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).json({ msg: "Terjadi kesalahan pada server" });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`Server up and running on port ${PORT}...`),
  );
}

export default app;
