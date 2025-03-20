const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    puntaje: { type: Number, required: true },
    categoria: { type: String, required: true },  // Ejemplo: "Estudiante", "Famoso", etc.
    fechaCreacion: { type: Date, default: Date.now },
});

const Ranking = mongoose.model("Ranking", rankingSchema);

module.exports = Ranking;