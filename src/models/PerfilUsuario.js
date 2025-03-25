const mongoose = require("mongoose");

//Fer que si inicie sesio en un usuari, cuant cree el perfil tinga el id del que ha iniciat sesio i el nom.
const perfilUsuarioSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true, unique: true },
    fotoPerfil: { type: String, default: "" },
    biografia: { type: String, default: "" },
    preferencias: { type: [String], default: [] }
});

module.exports = mongoose.model("PerfilUsuario", perfilUsuarioSchema);
