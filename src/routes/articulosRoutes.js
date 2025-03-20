const express = require("express");
const router = express.Router();
const articulosController = require("../controllers/articulosController");

// Articulos
router.post("/", articulosController.crearArticulo);
router.get("/", articulosController.obtenerArticulos);
router.get("/:id", articulosController.obtenerArticulo);
router.put("/:id", articulosController.actualizarArticulo);
router.delete("/:id", articulosController.eliminarArticulo);

module.exports = router;