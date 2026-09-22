import Address from "../model/Address.js";
import { Op } from "sequelize";

export const getMyAddresses = async (req, res, next) => {
  const search = req.query.search_query || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Address.findAndCountAll({
      where: {
        userId: req.account.id,
        [Op.or]: [
          { label: { [Op.like]: `%${search}%` } },
          { recipientName: { [Op.like]: `%${search}%` } },
          { city: { [Op.like]: `%${search}%` } },
        ],
      },
      limit,
      offset,
    });

    res.status(200).json({
      addresses: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (req, res, next) => {
  const {
    label,
    recipientName,
    phone,
    fullAddress,
    city,
    postalCode,
    isPrimary,
  } = req.body;

  if (
    !label ||
    !recipientName ||
    !phone ||
    !fullAddress ||
    !city ||
    !postalCode
  ) {
    return res.status(400).json({ msg: "Semua field wajib diisi" });
  }

  try {
    await Address.create({
      label,
      recipientName,
      phone,
      fullAddress,
      city,
      postalCode,
      isPrimary: isPrimary || false,
      userId: req.account.id,
    });
    res.status(201).json({ msg: "Alamat berhasil ditambahkan" });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ where: { id: req.params.id } });
    if (!address)
      return res.status(404).json({ msg: "Alamat tidak ditemukan" });

    if (address.userId !== req.account.id) {
      return res
        .status(403)
        .json({ msg: "Kamu tidak punya akses ke alamat ini" });
    }

    await Address.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ msg: "Alamat berhasil diperbarui" });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ where: { id: req.params.id } });
    if (!address)
      return res.status(404).json({ msg: "Alamat tidak ditemukan" });

    if (address.userId !== req.account.id) {
      return res
        .status(403)
        .json({ msg: "Kamu tidak punya akses ke alamat ini" });
    }

    await Address.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Alamat berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

export const setPrimaryAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ where: { id: req.params.id } });
    if (!address)
      return res.status(404).json({ msg: "Alamat tidak ditemukan" });

    if (address.userId !== req.account.id) {
      return res
        .status(403)
        .json({ msg: "Kamu tidak punya akses ke alamat ini" });
    }

    await Address.update(
      { isPrimary: false },
      { where: { userId: req.account.id } },
    );
    await Address.update({ isPrimary: true }, { where: { id: req.params.id } });

    res.status(200).json({ msg: "Alamat utama berhasil diperbarui" });
  } catch (error) {
    next(error);
  }
};
