const Consejo = require("../models/Consejo");

// Crear un nuevo consejo
const crearConsejo = async (req, res) => {
    try {
        const { titulo, autor, contenido, categoria } = req.body;
        const consejo = new Consejo({ titulo, autor, contenido, categoria });
        await consejo.save();
        res.status(201).json(consejo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los consejos
const obtenerConsejos = async (req, res) => {
    try {
        const consejos = await Consejo.find().sort({ fechaCreacion: -1 });
        res.json(consejos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un consejo por su ID
const obtenerConsejo = async (req, res) => {
    try {
        const consejo = await Consejo.findById(req.params.id);
        if (!consejo) {
            return res.status(404).json({ error: "Consejo no encontrado" });
        }
        res.json(consejo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un consejo por su ID
const actualizarConsejo = async (req, res) => {
    try {
        const consejo = await Consejo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!consejo) {
            return res.status(404).json({ error: "Consejo no encontrado" });
        }
        res.json(consejo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un consejo por su ID
const eliminarConsejo = async (req, res) => {
    try {
        const consejoEliminado = await Consejo.findByIdAndDelete(req.params.id);
        if (!consejoEliminado) {
            return res.status(404).json({ error: "Consejo no encontrado" });
        }
        res.json({ mensaje: "Consejo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    // Consejos
    crearConsejo,
    obtenerConsejos,
    obtenerConsejo,
    actualizarConsejo,
    eliminarConsejo,
};