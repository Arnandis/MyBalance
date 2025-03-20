const mongoose = require("mongoose");

const consejoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    contenido: { type: String, required: true },
    categoria: { type: String, required: true },  // Ejemplo: "Gestión de Tiempo", "Salud", etc.
    fechaCreacion: { type: Date, default: Date.now },
});

const Consejo = mongoose.model("Consejo", consejoSchema);

module.exports = Consejo;
