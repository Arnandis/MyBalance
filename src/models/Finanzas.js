const mongoose = require("mongoose");
//Mirar de que els numeros no puguen ser negatius i que la fecha tigna bon format.
// Ajustamos el esquema para aceptar un objeto de gastos con múltiples categorías
const finanzasSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  ingresos: { type: Number, required: true },
  gastos: {
    ocio: { type: Number, required: true, default: 0 },
    alquiler: { type: Number, required: true, default: 0 },
    festivales: { type: Number, required: true, default: 0 },
    compras: { type: Number, required: true, default: 0 },
    juegos: { type: Number, required: true, default: 0 },
    otros: { type: Number, required: true, default: 0 }
  },
  fecha: { type: Date, required: true },
});

const Finanzas = mongoose.model("Finanzas", finanzasSchema);

module.exports = Finanzas;
 