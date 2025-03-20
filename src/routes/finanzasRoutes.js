// src/routes/finanzaRoutes.js
const express = require("express");
const router = express.Router();
const {
    crearFinanza,
    obtenerFinanzas,
    obtenerFinanzasPorTipo,
    actualizarFinanza,
    eliminarFinanza
} = require("../controllers/finanzaController");

// 📌 Crear un registro financiero (ingreso o gasto)
router.post("/", crearFinanza);

// 📌 Obtener todos los registros de un usuario
router.get("/:usuarioId", obtenerFinanzas);

// 📌 Obtener registros filtrados por tipo (ingreso/gasto)
router.get("/:usuarioId/:tipo", obtenerFinanzasPorTipo);

// 📌 Actualizar un registro por ID
router.put("/:id", actualizarFinanza);

// 📌 Eliminar un registro por ID
router.delete("/:id", eliminarFinanza);

module.exports = router;
