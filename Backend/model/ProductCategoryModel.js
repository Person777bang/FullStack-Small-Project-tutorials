import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const ProductCategory = db.define('ProductCategories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_category_name'
    }
}, {
    freezeTableName: true
});

export default ProductCategory;