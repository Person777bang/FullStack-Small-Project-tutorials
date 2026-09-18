import User from "../model/UserModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const search = req.query.search_query || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      limit,
      offset,
    });

    res.status(200).json({
      users: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    await User.create(req.body);
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Di Sequelize, menghapus data menggunakan destroy, bukan delete
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
