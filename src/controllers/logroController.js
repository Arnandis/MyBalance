// src/controllers/logroController.js
const Logro = require("../models/Logros");

// Crear un nuevo logro
const crearLogro = async (req, res) => {
    try {
        const { usuarioId, descripcion, tipo } = req.body;
        const logro = new Logro({
            usuarioId,
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
        const logros = await Logro.find({ usuarioId: req.params.usuarioId });
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
        res.status(200).json(logro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un logro
const eliminarLogro = async (req, res) => {
    try {
        const logro = await Logro.findByIdAndDelete(req.params.id);
        if (!logro) {
            return res.status(404).json({ message: "Logro no encontrado" });
        }
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
