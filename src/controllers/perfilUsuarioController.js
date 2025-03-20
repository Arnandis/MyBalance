// src/controllers/perfilUsuarioController.js
const PerfilUsuario = require("../models/PerfilUsuario");

// Crear perfil de usuario
const crearPerfilUsuario = async (req, res) => {
    try {
        const perfil = new PerfilUsuario(req.body);
        await perfil.save();
        res.status(201).json(perfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener perfil por usuarioId
const obtenerPerfilUsuario = async (req, res) => {
    try {
        const perfil = await PerfilUsuario.findOne({ usuarioId: req.params.usuarioId });
        if (!perfil) return res.status(404).json({ mensaje: "Perfil no encontrado" });
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar perfil por usuarioId
const actualizarPerfilUsuario = async (req, res) => {
    try {
        const perfil = await PerfilUsuario.findOneAndUpdate(
            { usuarioId: req.params.usuarioId },
            req.body,
            { new: true }
        );
        if (!perfil) return res.status(404).json({ mensaje: "Perfil no encontrado" });
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar perfil por usuarioId
const eliminarPerfilUsuario = async (req, res) => {
    try {
        const perfil = await PerfilUsuario.findOneAndDelete({ usuarioId: req.params.usuarioId });
        if (!perfil) return res.status(404).json({ mensaje: "Perfil no encontrado" });
        res.json({ mensaje: "Perfil eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearPerfilUsuario,
    obtenerPerfilUsuario,
    actualizarPerfilUsuario,
    eliminarPerfilUsuario
};
