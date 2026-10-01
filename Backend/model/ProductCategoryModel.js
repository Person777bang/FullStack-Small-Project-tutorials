import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductCategory = db.define(
  "ProductCategory", // atau "ProductCategories" sesuaikan dengan nama tabel di phpMyAdmin/MySQL
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

export default ProductCategory;
