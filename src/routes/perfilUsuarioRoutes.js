// src/routes/perfilUsuarioRoutes.js
const express = require("express");
const router = express.Router();
const {
    crearPerfilUsuario,
    obtenerPerfilUsuario,
    actualizarPerfilUsuario,
    eliminarPerfilUsuario
} = require("../controllers/perfilUsuarioController");

// 📌 Crear perfil de usuario
router.post("/", crearPerfilUsuario);

// 📌 Obtener perfil por usuarioId
router.get("/:usuarioId", obtenerPerfilUsuario);

// 📌 Actualizar perfil por usuarioId
router.put("/:usuarioId", actualizarPerfilUsuario);

// 📌 Eliminar perfil por usuarioId
router.delete("/:usuarioId", eliminarPerfilUsuario);

module.exports = router;
