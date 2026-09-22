import Product from "../model/ProductModel.js";
import ProductCategory from "../model/ProductCategoryModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res, next) => {
  const search = req.query.search_query || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      include: [
        {
          model: ProductCategory,
          attributes: ["id", "name"],
        },
      ],
      limit,
      offset,
    });

    res.status(200).json({
      products: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const response = await Product.findOne({ where: { id: req.params.id } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  const { name, price, stock, categoryId } = req.body;

  if (!name || price === undefined || stock === undefined || !categoryId) {
    return res.status(400).json({ msg: "Semua wajib di isi" });
  }

  if (price < 0 || stock < 0) {
    return res.status(400).json({ msg: "Maaf Tidak Boleh Negatif" });
  }

  try {
    const category = await ProductCategory.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      return res.status(400).json({ msg: "Category tidak valid" });
    }

    await Product.create({ name, price, stock, categoryId });
    res.status(201).json({ msg: "Product berhasil ditambahkan" });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) {
      return res.status(404).json({ msg: "Product tidak ditemukan" });
    }
    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Product berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};
