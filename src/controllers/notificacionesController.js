// controllers/notificacionesController.js
const Notificacion = require("../models/Notificacion");

// Crear una nueva notificación
const crearNotificacion = async (req, res) => {
    try {
        const { usuarioId, contenido, activa } = req.body;
        const notificacion = new Notificacion({ usuarioId, contenido, activa });
        await notificacion.save();
        res.status(201).json(notificacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las notificaciones de un usuario
const obtenerNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.find({ usuarioId: req.params.usuarioId });
        res.json(notificaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Desactivar notificación
const desactivarNotificacion = async (req, res) => {
    try {
        const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { activa: false }, { new: true });
        if (!notificacion) {
            return res.status(404).json({ error: "Notificación no encontrada" });
        }
        res.json(notificacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearNotificacion,
    obtenerNotificaciones,
    desactivarNotificacion,
};
