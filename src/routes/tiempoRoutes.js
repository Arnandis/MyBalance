const express = require("express");
const router = express.Router();
const tiempoController = require("../controllers/tiempoController");
const authMiddleware = require("../middleware/authMiddleware");  // ⬅ Importamos el middleware

// 📌 Aplicamos `authMiddleware` a las rutas que necesitan autenticación
router.post("/", authMiddleware, tiempoController.crearTiempo);
router.get("/:usuarioId", authMiddleware, tiempoController.obtenerTiemposPorUsuario);
router.get("/registro/:id", authMiddleware, tiempoController.obtenerTiempoPorId);
router.put("/registro/:id", authMiddleware, tiempoController.actualizarTiempo);
router.delete("/registro/:id", authMiddleware, tiempoController.eliminarTiempo);
router.get("/grafico/:usuarioId", authMiddleware, tiempoController.obtenerTiempoPorCategoria);
router.get("/grafico/:usuarioId/:fechaInicio/:fechaFin", authMiddleware, tiempoController.obtenerTiempoEntreFechas);

module.exports = router;
