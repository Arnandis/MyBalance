const express = require("express");
const router = express.Router();
const rankingController = require("../controllers/rankingController");

// Crear un nuevo ranking
router.post("/", rankingController.crearRanking);

// Obtener el ranking de todos los usuarios, ordenado por puntaje
router.get("/", rankingController.obtenerRanking);

// Obtener el ranking de un usuario específico
router.get("/:nombre", rankingController.obtenerRankingUsuario);

// Eliminar un ranking por ID
router.delete("/:id", rankingController.eliminarRanking);

module.exports = router;
