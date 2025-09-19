import express from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";

import path from "node:path";
import { fileURLToPath } from "node:url";

// TABELAS
import './models/association.js'

// ROTAS
import chefeRouter from "./routes/chefeRouter.js"
import receitasRouter from "./routes/receitasRouter.js";
import usuarioRouter from "./routes/usuarioRouter.js"
import favoritosRouter from "./routes/favoritosRouter.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


conn
    .sync()
    .then(() => {
        console.log("Banco de dados conectado 🫥");
    })
    .catch((error) => console.log(error));

    app.use(express.json())
    app.use(express.urlencoded({extended: true})) //ACEITA receber de Imagens

    // Qual pasta que vou armazenar
app.use('/public', express.static(path.join(__dirname, '../public')))


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}))

app.use("/api/chefs", chefeRouter)
app.use("/api/receitas", receitasRouter)
app.use("/api/usuarios/perfil", usuarioRouter)
app.use("/api/favoritos", favoritosRouter)
app.use("/api/usuarios", usuarioRouter);

export default app;
