// models/Notificacion.js
const mongoose = require("mongoose");
//Auth Fet
const notificacionSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },  // Relacionado con el usuario
    contenido: { type: String, required: true },
    fecha: { type: Date, default: Date.now },  // Fecha de creación o programada
    activa: { type: Boolean, default: true }, // Estado de la notificación (activa o desactivada)
});

const Notificacion = mongoose.model("Notificacion", notificacionSchema);

module.exports = Notificacion;
