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
