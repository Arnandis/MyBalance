// src/routes/objetivoRoutes.js
const express = require("express");
const router = express.Router();
const {
    crearObjetivo,
    obtenerObjetivos,
    obtenerObjetivo,
    actualizarObjetivo,
    eliminarObjetivo
} = require("../controllers/objetivoController");

// Crear un nuevo objetivo
router.post("/", crearObjetivo);

// Obtener todos los objetivos de un usuario
router.get("/:usuarioId", obtenerObjetivos);

// Obtener un objetivo específico
router.get("/:id", obtenerObjetivo);

// Actualizar un objetivo
router.put("/:id", actualizarObjetivo);

// Eliminar un objetivo
router.delete("/:id", eliminarObjetivo);

module.exports = router;
