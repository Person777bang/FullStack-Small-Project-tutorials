import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductCategory = db.define(
  "ProductCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ProductCategories",
    freezeTableName: true,
  },
);

export default ProductCategory;
