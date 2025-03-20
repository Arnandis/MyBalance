// src/routes/finanzaRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");  // Importamos el middleware
const {
    crearFinanza,
    obtenerFinanzas,
    obtenerFinanzasPorTipo,
    actualizarFinanza,
    eliminarFinanza
} = require("../controllers/finanzaController");

// 📌 Crear un registro financiero (ingreso o gasto)
router.post("/", authMiddleware, crearFinanza);  // Aseguramos que el usuario esté autenticado

// 📌 Obtener todos los registros de un usuario
router.get("/", authMiddleware, obtenerFinanzas);  // Aseguramos que el usuario esté autenticado

// 📌 Obtener registros filtrados por tipo (ingreso/gasto)
router.get("/:tipo", authMiddleware, obtenerFinanzasPorTipo);  // Aseguramos que el usuario esté autenticado

// 📌 Actualizar un registro por ID
router.put("/:id", authMiddleware, actualizarFinanza);  // Aseguramos que el usuario esté autenticado

// 📌 Eliminar un registro por ID
router.delete("/:id", authMiddleware, eliminarFinanza);  // Aseguramos que el usuario esté autenticado

module.exports = router;
