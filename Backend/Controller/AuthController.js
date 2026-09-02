import Account from "../model/AccountModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "Semua field wajib diisi" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Password dan konfirmasi password tidak cocok" });
    }

    try {
        const existingAccount = await Account.findOne({ where: { email } });
        if (existingAccount) {
            return res.status(400).json({ msg: "Email sudah terdaftar" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await Account.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({ msg: "Registrasi berhasil, silakan login" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email dan password wajib diisi" });
    }

    try {
        const account = await Account.findOne({ where: { email } });
        if (!account) {
            return res.status(404).json({ msg: "Email tidak ditemukan" });
        }

        const match = await bcrypt.compare(password, account.password);
        if (!match) {
            return res.status(400).json({ msg: "Password salah" });
        }

        const token = jwt.sign(
            { id: account.id, name: account.name, email: account.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            msg: "Login berhasil",
            token,
            account: { id: account.id, name: account.name, email: account.email }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}