// routes/notificacionesRoutes.js
const express = require("express");
const router = express.Router();
const notificacionesController = require("../controllers/notificacionesController");

// Crear una notificación
router.post("/", notificacionesController.crearNotificacion);

// Obtener notificaciones de un usuario
router.get("/:usuarioId", notificacionesController.obtenerNotificaciones);

// Desactivar notificación
router.put("/desactivar/:id", notificacionesController.desactivarNotificacion);

module.exports = router;
