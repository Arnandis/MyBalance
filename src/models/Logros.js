// src/models/Logros.js
/*const mongoose = require("mongoose");
//Auth Fet
const logroSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario", // Relacionado con el modelo de Usuario
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    tipo: {
        type: String,
        enum: ["Finanzas", "Tiempo", "Personal", "Otros"],
        required: true
    }
});

const Logro = mongoose.model("Logro", logroSchema);

module.exports = Logro;*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logroSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String },
  tipo: { type: String, required: true },
  meta: { type: Number, required: true },
  progreso: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now },
  fechaLimite: { type: Date },
  completado: { type: Boolean, default: false }, // Indica si el objetivo está completado
  fechaLogro: { type: Date } // Solo se llena cuando el objetivo se completa
});

module.exports = mongoose.model('Logro', logroSchema);
