const Usuario = require("../models/Usuario");

//se tindra q gastar y que el torne al login despues...
// Cerrar sesión (Logout)
const logoutUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Borrar el token
        usuario.token = null;
        await usuario.save();

        res.json({ mensaje: "Sesión cerrada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { logoutUsuario };
