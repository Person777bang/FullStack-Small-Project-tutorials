import Product from "../model/ProductModel.js";
import ProductCategory from "../model/ProductCategoryModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: ProductCategory,
                attributes: ['id', 'name']
            }]
        });
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const createProduct = async (req, res) => {
    const { name, price, stock, categoryId } = req.body;

    // Semua field wajib diisi
    if (!name || price === undefined || stock === undefined || !categoryId) {
        return res.status(400).json({ msg: "Semua wajib di isi" });
    }

    // 2. Harga dan stock tidak boleh negatif
    if (price < 0 || stock < 0) {
        return res.status(400).json({ msg: "Maaf Tidak Boleh Negatif" });
    }

    try {
        // 3. Category harus valid
        const category = await ProductCategory.findOne({ where: { id: categoryId } });
        if (!category) {
            return res.status(400).json({ msg: "Category tidak valid" });
        }

        // 4. Simpan ke database
        await Product.create({ name, price, stock, categoryId });
        res.status(201).json({ msg: "Product berhasil ditambahkan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}