const express = require("express");
const router = express.Router();
const tiempoController = require("../controllers/tiempoController");

router.post("/", tiempoController.crearTiempo);
router.get("/:usuarioId", tiempoController.obtenerTiemposPorUsuario);
router.get("/registro/:id", tiempoController.obtenerTiempoPorId);
router.put("/registro/:id", tiempoController.actualizarTiempo);
router.delete("/registro/:id", tiempoController.eliminarTiempo);
router.get("/grafico/:usuarioId", tiempoController.obtenerTiempoPorCategoria);
router.get("/grafico/:usuarioId/:fechaInicio/:fechaFin", tiempoController.obtenerTiempoEntreFechas);

module.exports = router;
