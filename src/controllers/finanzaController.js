// src/controllers/finanzaController.js
const Finanzas = require("../models/Finanzas");

// Crear un registro financiero (ingreso o gasto)
const crearFinanza = async (req, res) => {
    try {
        const finanza = new Finanzas(req.body);
        await finanza.save();
        res.status(201).json(finanza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los registros de un usuario
const obtenerFinanzas = async (req, res) => {
    try {
        const finanzas = await Finanzas.find({ usuarioId: req.params.usuarioId });
        res.json(finanzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener registros filtrados por tipo (ingreso/gasto)
const obtenerFinanzasPorTipo = async (req, res) => {
    try {
        const finanzas = await Finanzas.find({ 
            usuarioId: req.params.usuarioId, 
            tipo: req.params.tipo 
        });
        res.json(finanzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro por ID
const actualizarFinanza = async (req, res) => {
    try {
        const finanza = await Finanzas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!finanza) return res.status(404).json({ mensaje: "Registro no encontrado" });
        res.json(finanza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro por ID
const eliminarFinanza = async (req, res) => {
    try {
        const finanza = await Finanzas.findByIdAndDelete(req.params.id);
        if (!finanza) return res.status(404).json({ mensaje: "Registro no encontrado" });
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearFinanza,
    obtenerFinanzas,
    obtenerFinanzasPorTipo,
    actualizarFinanza,
    eliminarFinanza
};
