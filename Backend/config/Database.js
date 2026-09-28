import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import dotenv from "dotenv";

const isSSL =
  process.env.DB_SSL === "true" ||
  process.env.DB_SSL === "1" ||
  dbPort === 4000;

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  dialectModule: mysql2, // memberitahu Vercel bundler untuk menyertakan modul mysql2
  dialectOptions: isSSL
    ? {
        ssl: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: false,
        },
      }
    : {},
});

export default db;
