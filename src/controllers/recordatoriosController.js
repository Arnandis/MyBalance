// controllers/recordatoriosController.js
const Recordatorio = require("../models/Recordatorio");

// Crear un nuevo recordatorio
const crearRecordatorio = async (req, res) => {
    try {
        const { usuarioId, mensaje, fechaHora, activo } = req.body;
        const recordatorio = new Recordatorio({ usuarioId, mensaje, fechaHora, activo });
        await recordatorio.save();
        res.status(201).json(recordatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los recordatorios de un usuario
const obtenerRecordatorios = async (req, res) => {
    try {
        const recordatorios = await Recordatorio.find({ usuarioId: req.params.usuarioId });
        res.json(recordatorios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Desactivar recordatorio
const desactivarRecordatorio = async (req, res) => {
    try {
        const recordatorio = await Recordatorio.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
        if (!recordatorio) {
            return res.status(404).json({ error: "Recordatorio no encontrado" });
        }
        res.json(recordatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearRecordatorio,
    obtenerRecordatorios,
    desactivarRecordatorio,
};
