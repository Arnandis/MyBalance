const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    // Crear y firmar el token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,  // Enviar el token de autenticación
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
    registrarUsuario,
  };