const Finanzas = require("../models/Finanzas");
//mirar crear finanza pq si cambiem el model tindra que crear lo que li pasem desde el frontend
//Repasar que no se elimina, no troba el registre.
//Iniciem sesio en un usuario i mos dona un token i creem una finanza, tornem a iniciar sesio en el mateix usuari mos dona un altre token, pero si no el
//cambiem en authentication i esta el vell, se crea igual pq no borrem els anteriors
// Crear un registro financiero (ingreso o gasto)
const crearFinanza = async (req, res) => {
    try {
        const nuevaFinanza = new Finanzas({
            usuarioId: req.usuario.id, // Usar el ID del usuario autenticado
            ...req.body
        });

        await nuevaFinanza.save();
        res.status(201).json(nuevaFinanza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los registros del usuario autenticado
const obtenerFinanzas = async (req, res) => {
    try {
        const finanzas = await Finanzas.find({ usuarioId: req.usuario.id }); 
        res.json(finanzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener registros filtrados por tipo
const obtenerFinanzasPorTipo = async (req, res) => {
    try {
        const finanzas = await Finanzas.find({ 
            usuarioId: req.usuario.id, 
            tipo: req.params.tipo 
        });
        res.json(finanzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro por ID (verificamos que pertenece al usuario autenticado)
const actualizarFinanza = async (req, res) => {
    try {
        const finanza = await Finanzas.findOneAndUpdate(
            { _id: req.params.id, usuarioId: req.usuario.id }, 
            req.body, 
            { new: true }
        );

        if (!finanza) return res.status(404).json({ mensaje: "Registro no encontrado" });
        res.json(finanza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro por ID (verificamos que pertenece al usuario autenticado)
const eliminarFinanza = async (req, res) => {
    try {
        const finanza = await Finanzas.findOneAndDelete({
            _id: req.params.id,
            usuarioId: req.usuario.id
        });

        if (!finanza) return res.status(404).json({ mensaje: "Registro no encontrado" });
        res.json({ mensaje: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearFinanza,
    obtenerFinanzas,
    obtenerFinanzasPorTipo,
    actualizarFinanza,
    eliminarFinanza
};
