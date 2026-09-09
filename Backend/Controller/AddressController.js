import Address from "../model/Address.js";

// Ambil semua alamat milik user yang sedang login
export const getMyAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll({
            where: { userId: req.account.id }
        });
        res.status(200).json(addresses);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}


export const createAddress = async (req, res) => {
    const { label, recipientName, phone, fullAddress, city, postalCode, isPrimary } = req.body;

    if (!label || !recipientName || !phone || !fullAddress || !city || !postalCode) {
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
            userId: req.account.id   
        });
        res.status(201).json({ msg: "Alamat berhasil ditambahkan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

// Update alamat (hanya boleh milik sendiri)
export const updateAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ where: { id: req.params.id } });
        if (!address) return res.status(404).json({ msg: "Alamat tidak ditemukan" });

        if (address.userId !== req.account.id) {
            return res.status(403).json({ msg: "Kamu tidak punya akses ke alamat ini" });
        }

        await Address.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ msg: "Alamat berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

// Hapus alamat (hanya boleh milik sendiri)
export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ where: { id: req.params.id } });
        if (!address) return res.status(404).json({ msg: "Alamat tidak ditemukan" });

        if (address.userId !== req.account.id) {
            return res.status(403).json({ msg: "Kamu tidak punya akses ke alamat ini" });
        }

        await Address.destroy({ where: { id: req.params.id } });
        res.status(200).json({ msg: "Alamat berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

// Set salah satu alamat jadi alamat utama/aktif
export const setPrimaryAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ where: { id: req.params.id } });
        if (!address) return res.status(404).json({ msg: "Alamat tidak ditemukan" });

        if (address.userId !== req.account.id) {
            return res.status(403).json({ msg: "Kamu tidak punya akses ke alamat ini" });
        }

        // Matikan status utama di semua alamat milik user ini dulu
        await Address.update(
            { isPrimary: false },
            { where: { userId: req.account.id } }
        );

        // Jadikan alamat yang dipilih sebagai utama
        await Address.update(
            { isPrimary: true },
            { where: { id: req.params.id } }
        );

        res.status(200).json({ msg: "Alamat utama berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}