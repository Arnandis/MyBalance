/*const mongoose = require("mongoose");
//Auth fet
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

module.exports = mongoose.model("Tiempo", tiempoSchema);*/
const mongoose = require("mongoose");
//Auth Fet
const tiempoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  trabajo: { type: Number, default: 0 },
  estudio: { type: Number, default: 0 },
  descanso: { type: Number, default: 0 },
  deporte: { type: Number, default: 0 },
  familia: { type: Number, default: 0 },
  otros: { type: Number, default: 0 },
  //fecha: { type: Date, required: true },  // Fecha personalizada elegida por el usuario
}, { timestamps: true }); //true si vols q aparega la fecha en la q se ha creat el grafic.

module.exports = mongoose.model("Tiempo", tiempoSchema);
