const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Asegúrate de que la ruta sea correcta
const notificacionesController = require("../controllers/notificacionesController");

// Crear una nueva notificación
router.post("/", authMiddleware, notificacionesController.crearNotificacion);

// Obtener todas las notificaciones del usuario autenticado
router.get("/", authMiddleware, notificacionesController.obtenerNotificaciones);

// Desactivar una notificación
router.put("/desactivar/:id", authMiddleware, notificacionesController.desactivarNotificacion);

// Activar una notificación
router.put("/activar/:id", authMiddleware, notificacionesController.activarNotificacion);

// Eliminar una notificación
router.delete("/:id", authMiddleware, notificacionesController.eliminarNotificacion);

module.exports = router;
