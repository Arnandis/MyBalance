const Logro = require("../models/Logros");

// Crear un nuevo logro
const crearLogro = async (req, res) => {
    try {
        const { descripcion, tipo } = req.body;

        // Creamos el logro con el usuarioId del token
        const logro = new Logro({
            usuarioId: req.usuario.id,  // Obtenemos el usuarioId del token
            descripcion,
            tipo
        });
        await logro.save();
        res.status(201).json(logro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los logros de un usuario
const obtenerLogros = async (req, res) => {
    try {
        // Usamos el usuarioId del token para obtener solo los logros del usuario autenticado
        const logros = await Logro.find({ usuarioId: req.usuario.id });
        res.status(200).json(logros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un logro específico
const obtenerLogro = async (req, res) => {
    try {
        const logro = await Logro.findById(req.params.id);
        if (!logro) {
            return res.status(404).json({ message: "Logro no encontrado" });
        }

        // Verificamos que el logro pertenece al usuario autenticado
        if (logro.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ message: "No autorizado a ver este logro" });
        }

        res.status(200).json(logro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un logro
const eliminarLogro = async (req, res) => {
    try {
        const logro = await Logro.findById(req.params.id);
        if (!logro) {
            return res.status(404).json({ message: "Logro no encontrado" });
        }

        // Verificamos que el logro pertenece al usuario autenticado
        if (logro.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ message: "No autorizado a eliminar este logro" });
        }

        await Logro.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Logro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearLogro,
    obtenerLogros,
    obtenerLogro,
    eliminarLogro
};
