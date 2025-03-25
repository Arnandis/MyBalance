const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    crearObjetivo,
    obtenerObjetivos,
    obtenerObjetivo,
    actualizarObjetivo,
    eliminarObjetivo
} = require("../controllers/objetivoController");

// Crear un nuevo objetivo
router.post("/", authMiddleware, crearObjetivo);

// Obtener todos los objetivos del usuario autenticado
router.get("/", authMiddleware, obtenerObjetivos);

// Obtener un objetivo específico
router.get("/:id", authMiddleware, obtenerObjetivo);

// Actualizar un objetivo
router.put("/:id", authMiddleware, actualizarObjetivo);

// Eliminar un objetivo
router.delete("/:id", authMiddleware, eliminarObjetivo);

module.exports = router;
