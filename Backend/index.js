import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import Account from "./model/AccountModel.js"
import db from "./config/Database.js";
import "dotenv/config";

(async () => {
    await db.sync({ alter: true });
})();

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(Account);

app.listen(5000, ()=> console.log('Server up and running...'));
