// models/Recordatorio.js
const mongoose = require("mongoose");

const recordatorioSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },  // Relacionado con el usuario
    mensaje: { type: String, required: true },
    fechaHora: { type: Date, required: true },  // Fecha y hora del recordatorio
    activo: { type: Boolean, default: true },  // Estado del recordatorio (activo o desactivado)
});

const Recordatorio = mongoose.model("Recordatorio", recordatorioSchema);

module.exports = Recordatorio;
