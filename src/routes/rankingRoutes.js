const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Middleware de autenticación
const rankingController = require("../controllers/rankingController");
//Auth fet pero nia que repasar tot.
// Crear un nuevo ranking (solo usuarios autenticados)
router.post("/", authMiddleware, rankingController.crearRanking);

// Obtener el ranking de todos los usuarios, ordenado por puntaje
router.get("/", rankingController.obtenerRanking); // No es necesario auth para ranking global

// Obtener el ranking de un usuario específico (solo usuarios autenticados)
router.get("/:nombre", authMiddleware, rankingController.obtenerRankingUsuario); // Requiere auth

// Eliminar un ranking (solo el usuario autenticado puede eliminar su propio ranking)
router.delete("/:id", authMiddleware, rankingController.eliminarRanking); // Requiere auth para eliminar

module.exports = router;
