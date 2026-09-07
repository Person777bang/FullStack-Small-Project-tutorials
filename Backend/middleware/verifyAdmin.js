export const verifyAdmin = (req, res, next) => {
    if (req.account.role !== 'admin') {
        return res.status(403).json({ msg: "Akses ditolak, hanya untuk admin" });
    }
    next();
};