const Tiempo = require("../models/Tiempo");

// Crear un registro de tiempo
const crearTiempo = async (req, res) => {
    try {
        const tiempo = new Tiempo({
            ...req.body,
            usuarioId: req.usuario.id  // Usamos el ID del usuario autenticado
        });
        await tiempo.save();
        res.status(201).json(tiempo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los registros de tiempo de un usuario
const obtenerTiemposPorUsuario = async (req, res) => {
    try {
        // Aquí solo obtenemos los registros del usuario autenticado
        const tiempo = await Tiempo.find({ usuarioId: req.usuario.id });
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

        // Verificamos que el registro pertenece al usuario autenticado
        if (tiempo.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a ver este registro" });
        }

        res.json(tiempo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Actualizar un registro de tiempo por su ID
const actualizarTiempo = async (req, res) => {
    try {
        const tiempo = await Tiempo.findById(req.params.id);
        if (!tiempo) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }
        if (tiempo.usuarioId.toString() !== req.usuario.id) { // Verificamos que el tiempo pertenece al usuario autenticado
            return res.status(403).json({ error: "No autorizado a actualizar este registro" });
        }
        const tiempoActualizado = await Tiempo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tiempoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro de tiempo por su ID
const eliminarTiempo = async (req, res) => {
    try {
        const tiempo = await Tiempo.findOneAndDelete({
            _id: req.params.id,
            usuarioId: req.usuario.id  // Verificamos que el tiempo corresponde al usuario autenticado
        });
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
            { $match: { usuarioId: req.usuario.id } }, // Usamos el ID del usuario autenticado
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
                usuarioId: req.usuario.id,  // Usamos el ID del usuario autenticado
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
