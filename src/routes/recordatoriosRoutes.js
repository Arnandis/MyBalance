const express = require("express");
const router = express.Router();
const recordatoriosController = require("../controllers/recordatoriosController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware de autenticación

// Crear un recordatorio
router.post("/", authMiddleware, recordatoriosController.crearRecordatorio);

// Obtener recordatorios de un usuario
router.get("/", authMiddleware, recordatoriosController.obtenerRecordatorios);

// Cambiar el estado de un recordatorio (activar/desactivar) en el json posar si vuic false o true el estado
router.put("/estado/:id", authMiddleware, recordatoriosController.cambiarEstadoRecordatorio);

// Eliminar un recordatorio
router.delete("/:id", authMiddleware, recordatoriosController.eliminarRecordatorio);

module.exports = router;
