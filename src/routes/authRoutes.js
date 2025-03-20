const express = require('express');
const router = express.Router();

// Importa los controladores usando rutas relativas
const authLogin = require('../auth/authLogin');  // Ruta relativa
const authRegistrar = require('../auth/authRegistrar');  // Ruta relativa

// Registrar un usuario
router.post('/registro', authRegistrar.registrarUsuario); // Asegúrate de que authRegistrar tenga la función registrarUsuario

// Iniciar sesión (login)
router.post('/login', authLogin.loginUsuario); // Asegúrate de que authLogin tenga la función loginUsuario

module.exports = router;
