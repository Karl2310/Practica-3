const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "El Token es requerido " });
    }

    const token = authHeader.split(" ")[1];

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.user = datos;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token no valido" });
    }

}
module.exports = verificarToken;