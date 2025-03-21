require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//En el frontend gastar React Native i TypeScript. Componentes...
const app = express();
const PORT = process.env.PORT || 5000;
//const de las rutas
const usuarioRoutes = require("/home/pau/Escritorio/MyBalance/src/routes/usuarioRoutes.js");
const perfilUsuarioRoutes = require("./routes/perfilUsuarioRoutes");
const finanzasRoutes = require("./routes/finanzasRoutes");
const tiempoRoutes = require("./routes/tiempoRoutes");
const objetivoRoutes = require("./routes/objetivoRoutes");
const logrosRoutes = require("./routes/logrosRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const articulosRoutes = require("./routes/articulosRoutes");
const consejosRoutes = require("./routes/consejosRoutes");
const notificacionesRoutes = require("./routes/notificacionesRoutes");
const recordatoriosRoutes = require("./routes/recordatoriosRoutes");
const authRoutes = require("./routes/authRoutes"); 


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

//rutas de mi base datos
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/perfiles", perfilUsuarioRoutes);
app.use("/api/finanzas", finanzasRoutes);
app.use("/api/tiempo", tiempoRoutes);
app.use("/api/objetivos", objetivoRoutes);
app.use("/api/logros", logrosRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/articulos", articulosRoutes);
app.use("/api/consejos", consejosRoutes);
app.use("/api/notificaciones", notificacionesRoutes);
app.use("/api/recordatorios", recordatoriosRoutes);
app.use("/api/auth", authRoutes); // Define la ruta base para la autenticación


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

