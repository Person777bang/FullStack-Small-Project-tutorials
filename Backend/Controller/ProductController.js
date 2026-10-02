import Product from "../model/ProductModel.js";
import ProductCategory from "../model/ProductCategoryModel.js";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";

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

// 2. Dapatkan Detail Produk berdasarkan ID
export const getProductById = async (req, res, next) => {
  try {
    const response = await Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: ProductCategory,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!response) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// 3. Tambah Produk Baru
export const createProduct = async (req, res, next) => {
  const { name, price, stock, description, categoryId } = req.body;

  // Validasi field wajib
  if (!name || price === undefined || stock === undefined || !categoryId) {
    return res.status(400).json({ msg: "Semua field wajib diisi" });
  }

  // Validasi nilai angka
  if (Number(price) < 0 || Number(stock) < 0) {
    return res.status(400).json({ msg: "Harga dan Stok tidak boleh negatif" });
  }

  try {
    // Validasi kategori
    const category = await ProductCategory.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ msg: "Kategori tidak valid" });
    }

    let imageFiles = [];
    if (req.files && req.files.length > 0) {
      imageFiles = req.files.map((file) => file.filename);
    }

    const mainImage = imageFiles[0] || null;

    // Generate URL foto lengkap
    const url = mainImage
      ? `${req.protocol}://${req.get("host")}/images/${mainImage}`
      : null;

    await Product.create({
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      categoryId: Number(categoryId),
      image: mainImage,
      images: JSON.stringify(imageFiles),
      url: url,
      userId: req.userId, // Menyimpan ID pembuat produk
    });

    res.status(201).json({ msg: "Produk berhasil ditambahkan" });
  } catch (error) {
    next(error);
  }
};

// 4. Update/Edit Produk (Pemilik Produk & Admin)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }

    // OTORISASI EDIT: Jika BUKAN admin DAN BUKAN pemilik produk -> TOLAK
    if (req.role !== "admin" && product.userId !== req.userId) {
      return res.status(403).json({
        msg: "Akses ditolak! Anda hanya dapat mengedit produk milik sendiri.",
      });
    }

    const { name, price, stock, description, categoryId } = req.body;

    let imageFiles = [];
    let mainImage = product.image;
    let url = product.url;

    // Jika ada upload gambar baru
    if (req.files && req.files.length > 0) {
      imageFiles = req.files.map((file) => file.filename);
      mainImage = imageFiles[0];
      url = `${req.protocol}://${req.get("host")}/images/${mainImage}`;

      // Hapus file gambar lama jika ada
      if (product.image) {
        const filepath = `./public/images/${product.image}`;
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      }
    }

    await Product.update(
      {
        name: name || product.name,
        price: price !== undefined ? Number(price) : product.price,
        stock: stock !== undefined ? Number(stock) : product.stock,
        description: description || product.description,
        categoryId: categoryId ? Number(categoryId) : product.categoryId,
        image: mainImage,
        images:
          imageFiles.length > 0 ? JSON.stringify(imageFiles) : product.images,
        url: url,
      },
      { where: { id: product.id } },
    );

    res.status(200).json({ msg: "Produk berhasil diperbarui" });
  } catch (error) {
    next(error);
  }
};

// 5. Hapus Produk (KHUSUS ADMIN)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }

    // OTORISASI HAPUS: Khusus Admin
    if (req.role !== "admin") {
      return res.status(403).json({
        msg: "Akses ditolak! Hanya Admin yang dapat menghapus produk.",
      });
    }

    if (product.image) {
      const filepath = `./public/images/${product.image}`;
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }

    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// 6. Dapatkan Daftar Kategori
export const getCategories = async (req, res, next) => {
  try {
    const categories = await ProductCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
