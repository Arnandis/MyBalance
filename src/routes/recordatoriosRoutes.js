// routes/recordatoriosRoutes.js
const express = require("express");
const router = express.Router();
const recordatoriosController = require("../controllers/recordatoriosController");

// Crear un recordatorio
router.post("/", recordatoriosController.crearRecordatorio);

// Obtener recordatorios de un usuario
router.get("/:usuarioId", recordatoriosController.obtenerRecordatorios);

// Desactivar recordatorio
router.put("/desactivar/:id", recordatoriosController.desactivarRecordatorio);

module.exports = router;
