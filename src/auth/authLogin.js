const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

//Tinc que fer que se actualizce el token cada volta que el usuari faxa una consulta o que expire si no. Fer un Log out y que el token de ixe usuari ja no se puga utilitzar.
// Iniciar sesión (Login)
const loginUsuario = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
      }
  
      // Comparar la contraseña proporcionada con la guardada
      const esValido = await usuario.matchPassword(password);
      if (!esValido) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
      }
  
      // Crear y firmar el token. fer que expire en 15 min y que se vaxa actualitzant
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
  
      res.json({
        mensaje: 'Inicio de sesión exitoso',
        token,  // Enviar el token de autenticación
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    loginUsuario,
  };