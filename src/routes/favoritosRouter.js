import { Router } from "express";
import { adicionarFavorito } from "../controllers/favoritosReceitasControllers.js";


const router = Router()

router.post("/", adicionarFavorito)


export default router