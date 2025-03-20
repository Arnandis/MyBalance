const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Leer el token del header
    if (!authHeader) {
        return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
    }

    const token = authHeader.split(" ")[1]; // Extraer el token (después de "Bearer")
    if (!token) {
        return res.status(401).json({ error: "Token inválido o no proporcionado." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.usuario = decoded; // Guardar los datos del usuario en req
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};

module.exports = authMiddleware;
