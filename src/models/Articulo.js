const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    contenido: { type: String, required: true },
    categoria: { type: String, required: true },  // Ejemplo: "Finanzas", "Salud", etc.
    fechaCreacion: { type: Date, default: Date.now },
});

const Articulo = mongoose.model("Articulo", articuloSchema);

module.exports = Articulo;
