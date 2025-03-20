const mongoose = require("mongoose");

const finanzasSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    tipo: { type: String, enum: ["ingreso", "gasto"], required: true },
    cantidad: { type: Number, required: true },
    categoria: { 
        type: String, 
        enum: ["Ocio", "Alquiler", "Compras", "Festivales", "Juegos",""], 
        required: true 
    },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String, default: "" }
});
