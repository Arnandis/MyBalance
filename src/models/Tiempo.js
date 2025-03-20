const mongoose = require("mongoose");

const tiempoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    categoria: { 
        type: String, 
        enum: ["Trabajando", "Estudiando", "Deporte", "Familia", "Descansando", "Otros"], 
        required: true 
    },
    horas: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tiempo", tiempoSchema);
