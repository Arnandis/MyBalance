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
        // Verificar si el usuario autenticado está buscando su propio ranking
        if (req.usuario.nombre !== req.params.nombre) {
            return res.status(403).json({ error: "No autorizado a ver el ranking de otro usuario" });
        }

        const ranking = await Ranking.findOne({ nombre: req.params.nombre });
        if (!ranking) {
            return res.status(404).json({ error: "Usuario no encontrado en el ranking" });
        }
        res.json(ranking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un ranking (solo el usuario autenticado puede eliminar su propio ranking)
const eliminarRanking = async (req, res) => {
    try {
        const ranking = await Ranking.findById(req.params.id);
        if (!ranking) {
            return res.status(404).json({ error: "Ranking no encontrado" });
        }

        // Verificar que el usuario autenticado sea el propietario del ranking
        if (ranking.nombre !== req.usuario.nombre) {
            return res.status(403).json({ error: "No autorizado a eliminar este ranking" });
        }

        await Ranking.findByIdAndDelete(req.params.id);
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
