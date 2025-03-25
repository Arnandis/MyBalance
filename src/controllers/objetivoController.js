const Objetivo = require("../models/Objetivos");

// Crear un nuevo objetivo
const crearObjetivo = async (req, res) => {
    try {
        const { descripcion, tipo, valor, fechaLimite } = req.body;
        const objetivo = new Objetivo({
            usuarioId: req.usuario.id, // Usamos el id del usuario autenticado
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

// Obtener todos los objetivos del usuario autenticado
const obtenerObjetivos = async (req, res) => {
    try {
        // El usuarioId ya está disponible gracias al middleware
        const objetivos = await Objetivo.find({ usuarioId: req.usuario.id });
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
        // Verificamos que el objetivo pertenece al usuario autenticado
        if (objetivo.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a ver este objetivo" });
        }
        res.status(200).json(objetivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un objetivo
const actualizarObjetivo = async (req, res) => {
    try {
        const objetivo = await Objetivo.findById(req.params.id);
        if (!objetivo) {
            return res.status(404).json({ message: "Objetivo no encontrado" });
        }
        // Verificamos que el objetivo pertenece al usuario autenticado
        if (objetivo.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a actualizar este objetivo" });
        }
        const updatedObjetivo = await Objetivo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedObjetivo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un objetivo
const eliminarObjetivo = async (req, res) => {
    try {
        const objetivo = await Objetivo.findById(req.params.id);
        if (!objetivo) {
            return res.status(404).json({ message: "Objetivo no encontrado" });
        }
        // Verificamos que el objetivo pertenece al usuario autenticado
        if (objetivo.usuarioId.toString() !== req.usuario.id) {
            return res.status(403).json({ error: "No autorizado a eliminar este objetivo" });
        }
        await Objetivo.findByIdAndDelete(req.params.id);
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
