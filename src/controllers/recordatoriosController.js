const Recordatorio = require("../models/Recordatorio");

// Crear un nuevo recordatorio
const crearRecordatorio = async (req, res) => {
    try {
        const { mensaje, fechaHora, activo } = req.body;

        const recordatorio = new Recordatorio({
            usuarioId: req.usuario.id,  // Usamos el usuarioId del token
            mensaje,
            fechaHora,
            activo: activo || false  // Si no se pasa el valor de 'activo', lo seteamos a 'false' por defecto
        });
        await recordatorio.save();
        res.status(201).json(recordatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los recordatorios de un usuario
const obtenerRecordatorios = async (req, res) => {
    try {
        const recordatorios = await Recordatorio.find({ usuarioId: req.usuario.id });
        res.json(recordatorios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Activar o desactivar un recordatorio
const cambiarEstadoRecordatorio = async (req, res) => {
    try {
        const { activo } = req.body;  // 'activo' debe ser true o false
        if (typeof activo !== "boolean") {
            return res.status(400).json({ error: "El valor de 'activo' debe ser un booleano" });
        }

        const recordatorio = await Recordatorio.findById(req.params.id);
        if (!recordatorio) {
            return res.status(404).json({ error: "Recordatorio no encontrado" });
        }

        // Verificamos que el recordatorio pertenece al usuario autenticado
        if (recordatorio.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a modificar este recordatorio" });
        }

        // Actualizamos el estado 'activo'
        recordatorio.activo = activo;
        await recordatorio.save();
        res.json(recordatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un recordatorio
const eliminarRecordatorio = async (req, res) => {
    try {
        const recordatorio = await Recordatorio.findByIdAndDelete(req.params.id);
        if (!recordatorio) {
            return res.status(404).json({ error: "Recordatorio no encontrado" });
        }

        // Verificamos que el recordatorio pertenece al usuario autenticado
        if (recordatorio.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a eliminar este recordatorio" });
        }

        res.status(200).json({ message: "Recordatorio eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearRecordatorio,
    obtenerRecordatorios,
    cambiarEstadoRecordatorio,
    eliminarRecordatorio
};
