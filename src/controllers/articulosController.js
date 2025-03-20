const Articulo = require("../models/Articulo");

// Crear un nuevo artículo
const crearArticulo = async (req, res) => {
    try {
        const { titulo, autor, contenido, categoria } = req.body;
        const articulo = new Articulo({ titulo, autor, contenido, categoria });
        await articulo.save();
        res.status(201).json(articulo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los artículos
const obtenerArticulos = async (req, res) => {
    try {
        const articulos = await Articulo.find().sort({ fechaCreacion: -1 });
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un artículo por su ID
const obtenerArticulo = async (req, res) => {
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({ error: "Artículo no encontrado" });
        }
        res.json(articulo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un artículo por su ID
const actualizarArticulo = async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!articulo) {
            return res.status(404).json({ error: "Artículo no encontrado" });
        }
        res.json(articulo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un artículo por su ID
const eliminarArticulo = async (req, res) => {
    try {
        const articuloEliminado = await Articulo.findByIdAndDelete(req.params.id);
        if (!articuloEliminado) {
            return res.status(404).json({ error: "Artículo no encontrado" });
        }
        res.json({ mensaje: "Artículo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    // Articulos
    crearArticulo,
    obtenerArticulos,
    obtenerArticulo,
    actualizarArticulo,
    eliminarArticulo,
};