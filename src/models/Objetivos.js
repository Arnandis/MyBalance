// src/models/Objetivos.js
const mongoose = require("mongoose");

const objetivoSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario", // Relacionado con el modelo de Usuario
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ["Finanzas", "Tiempo", "Personal", "Otros"],
        required: true
    },
    valor: {
        type: Number, // Puede ser una cantidad de dinero, horas, etc.
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaLimite: {
        type: Date
    },
    cumplido: {
        type: Boolean,
        default: false
    }
});

const Objetivo = mongoose.model("Objetivo", objetivoSchema);

module.exports = Objetivo;
    