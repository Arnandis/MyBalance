const Ranking = require("../models/Ranking");

// Crear un nuevo ranking
const crearRanking = async (req, res) => {
    try {
        const { nombre, puntaje, categoria } = req.body;
        const ranking = new Ranking({ nombre, puntaje, categoria });
        await ranking.save();
        res.status(201).json(ranking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los rankings ordenados por puntaje
const obtenerRanking = async (req, res) => {
    try {
        const rankings = await Ranking.find().sort({ puntaje: -1 });  // Ordenar de mayor a menor puntaje
        res.json(rankings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener el ranking de un usuario específico
const obtenerRankingUsuario = async (req, res) => {
    try {
        const ranking = await Ranking.findOne({ nombre: req.params.nombre });
        if (!ranking) {
            return res.status(404).json({ error: "Usuario no encontrado en el ranking" });
        }
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un ranking (por ejemplo, si un usuario desea eliminar su propio puntaje)
const eliminarRanking = async (req, res) => {
    try {
        const rankingEliminado = await Ranking.findByIdAndDelete(req.params.id);
        if (!rankingEliminado) {
            return res.status(404).json({ error: "Ranking no encontrado" });
        }
        res.json({ mensaje: "Ranking eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearRanking,
    obtenerRanking,
    obtenerRankingUsuario,
    eliminarRanking,
};
