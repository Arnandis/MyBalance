const Tiempo = require("../models/Tiempo");

// Crear un registro de tiempo
const crearTiempo = async (req, res) => {
    try {
        const tiempo = new Tiempo(req.body);
        await tiempo.save();
        res.status(201).json(tiempo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los registros de tiempo de un usuario
const obtenerTiemposPorUsuario = async (req, res) => {
    try {
        const tiempo = await Tiempo.find({ usuarioId: req.params.usuarioId });
        res.json(tiempo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un solo registro de tiempo por su ID
const obtenerTiempoPorId = async (req, res) => {
    try {
        const tiempo = await Tiempo.findById(req.params.id);
        if (!tiempo) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }
        res.json(tiempo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro de tiempo por su ID
const actualizarTiempo = async (req, res) => {
    try {
        const tiempo = await Tiempo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tiempo) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }
        res.json(tiempo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro de tiempo por su ID
const eliminarTiempo = async (req, res) => {
    try {
        const tiempo = await Tiempo.findByIdAndDelete(req.params.id);
        if (!tiempo) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }
        res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener los registros de tiempo por usuario y por categoría
const obtenerTiempoPorCategoria = async (req, res) => {
    try {
        const tiempoPorCategoria = await Tiempo.aggregate([
            { $match: { usuarioId: req.params.usuarioId } },
            { $group: { _id: "$categoria", totalHoras: { $sum: "$horas" } } }
        ]);
        res.json(tiempoPorCategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener los registros de tiempo de un usuario entre dos fechas
const obtenerTiempoEntreFechas = async (req, res) => {
    try {
        const tiempoPorCategoria = await Tiempo.aggregate([
            { $match: { 
                usuarioId: req.params.usuarioId, 
                fecha: { $gte: new Date(req.params.fechaInicio), $lte: new Date(req.params.fechaFin) } 
            }},
            { $group: { _id: "$categoria", totalHoras: { $sum: "$horas" } } }
        ]);
        res.json(tiempoPorCategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearTiempo,
    obtenerTiemposPorUsuario,
    obtenerTiempoPorId,
    actualizarTiempo,
    eliminarTiempo,
    obtenerTiempoPorCategoria,
    obtenerTiempoEntreFechas
};
