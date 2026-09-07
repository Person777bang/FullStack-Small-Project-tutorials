import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Token tidak ditemukan, silakan login" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ msg: "Token sudah kedaluwarsa, silakan login ulang" });
            }
            return res.status(403).json({ msg: "Token tidak valid" });
        }
        req.account = decoded;
        next();
    });
};