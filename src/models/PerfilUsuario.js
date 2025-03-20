const mongoose = require("mongoose");

const perfilUsuarioSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true, unique: true },
    fotoPerfil: { type: String, default: "" },
    biografia: { type: String, default: "" },
    preferencias: { type: [String], default: [] }
});

module.exports = mongoose.model("PerfilUsuario", perfilUsuarioSchema);
