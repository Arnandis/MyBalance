// src/controllers/objetivoController.js
const Objetivo = require("../models/Objetivos");

// Crear un nuevo objetivo
const crearObjetivo = async (req, res) => {
    try {
        const { usuarioId, descripcion, tipo, valor, fechaLimite } = req.body;
        const objetivo = new Objetivo({
            usuarioId,
            descripcion,
            tipo,
            valor,
            fechaLimite
        });
        await objetivo.save();
        res.status(201).json(objetivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los objetivos de un usuario
const obtenerObjetivos = async (req, res) => {
    try {
        const objetivos = await Objetivo.find({ usuarioId: req.params.usuarioId });
        res.status(200).json(objetivos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un objetivo específico
const obtenerObjetivo = async (req, res) => {
    try {
        const objetivo = await Objetivo.findById(req.params.id);
        if (!objetivo) {
            return res.status(404).json({ message: "Objetivo no encontrado" });
        }
        res.status(200).json(objetivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un objetivo
const actualizarObjetivo = async (req, res) => {
    try {
        const objetivo = await Objetivo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!objetivo) {
            return res.status(404).json({ message: "Objetivo no encontrado" });
        }
        res.status(200).json(objetivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un objetivo
const eliminarObjetivo = async (req, res) => {
    try {
        const objetivo = await Objetivo.findByIdAndDelete(req.params.id);
        if (!objetivo) {
            return res.status(404).json({ message: "Objetivo no encontrado" });
        }
        res.status(200).json({ message: "Objetivo eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearObjetivo,
    obtenerObjetivos,
    obtenerObjetivo,
    actualizarObjetivo,
    eliminarObjetivo
};
