const express = require("express");
const router = express.Router();
const {
    crearLogro,
    obtenerLogros,
    obtenerLogro,
    eliminarLogro
} = require("../controllers/logroController");
const authMiddleware = require("../middleware/authMiddleware"); // Asegúrate de incluir el middleware
//alomilor falta añadir mes path
// Crear un nuevo logro
router.post("/", authMiddleware, crearLogro);

// Obtener todos los logros de un usuario
router.get("/", authMiddleware, obtenerLogros);

// Obtener un logro específico
router.get("/:id", authMiddleware, obtenerLogro);

// Eliminar un logro
router.delete("/:id", authMiddleware, eliminarLogro);

module.exports = router;
