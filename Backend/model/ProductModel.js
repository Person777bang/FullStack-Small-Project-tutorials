import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import ProductCategory from "./ProductCategoryModel.js";

const Product = db.define('Products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Product.belongsTo(ProductCategory, { foreignKey: 'categoryId' });
ProductCategory.hasMany(Product, { foreignKey: 'categoryId' });

export default Product;