const Notificacion = require("../models/Notificacion");

// Crear una nueva notificación
const crearNotificacion = async (req, res) => {
    try {
        const { contenido, activa } = req.body;
        const notificacion = new Notificacion({
            usuarioId: req.usuario.id, // Obtener usuarioId del token JWT
            contenido,
            activa,
        });
        await notificacion.save();
        res.status(201).json(notificacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las notificaciones del usuario autenticado
const obtenerNotificaciones = async (req, res) => {
    try {
        // Usamos el usuarioId desde el token (req.usuario.id)
        const notificaciones = await Notificacion.find({ usuarioId: req.usuario.id });
        res.json(notificaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Desactivar una notificación
const desactivarNotificacion = async (req, res) => {
    try {
        const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { activa: false }, { new: true });
        if (!notificacion) {
            return res.status(404).json({ error: "Notificación no encontrada" });
        }
        if (notificacion.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a desactivar esta notificación" });
        }
        res.json(notificacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Activar una notificación
const activarNotificacion = async (req, res) => {
    try {
        const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { activa: true }, { new: true });
        if (!notificacion) {
            return res.status(404).json({ error: "Notificación no encontrada" });
        }
        if (notificacion.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a activar esta notificación" });
        }
        res.json(notificacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una notificación
const eliminarNotificacion = async (req, res) => {
    try {
        const notificacion = await Notificacion.findById(req.params.id);
        if (!notificacion) {
            return res.status(404).json({ error: "Notificación no encontrada" });
        }
        if (notificacion.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a eliminar esta notificación" });
        }
        await Notificacion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Notificación eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearNotificacion,
    obtenerNotificaciones,
    desactivarNotificacion,
    activarNotificacion,
    eliminarNotificacion,
};
