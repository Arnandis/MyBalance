// src/models/Logros.js
const mongoose = require("mongoose");

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

module.exports = Logro;
