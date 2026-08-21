import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductCategory = db.define('ProductCategories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
});

export default ProductCategory;