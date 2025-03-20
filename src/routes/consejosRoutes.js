const express = require("express");
const router = express.Router();
const consejosController = require("../controllers/consejosController");

// Consejos
router.post("/", consejosController.crearConsejo);
router.get("/", consejosController.obtenerConsejos);
router.get("/:id", consejosController.obtenerConsejo);
router.put("/:id", consejosController.actualizarConsejo);
router.delete("/:id", consejosController.eliminarConsejo);

module.exports = router;