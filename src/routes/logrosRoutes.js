// src/routes/logroRoutes.js
const express = require("express");
const router = express.Router();
const {
    crearLogro,
    obtenerLogros,
    obtenerLogro,
    eliminarLogro
} = require("../controllers/logroController");

// Crear un nuevo logro
router.post("/", crearLogro);

// Obtener todos los logros de un usuario
router.get("/:usuarioId", obtenerLogros);

// Obtener un logro específico
router.get("/:id", obtenerLogro);

// Eliminar un logro
router.delete("/:id", eliminarLogro);

module.exports = router;
