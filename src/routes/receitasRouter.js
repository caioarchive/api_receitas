import { Router } from "express";
import { atualizarReceita, buscarReceita, criarReceita, deletarReceita, listarReceitas, cadastrarCapaReceita } from "../controllers/receitasControllrs.js";

import { imageUpload } from "../middleware/imageUpload.js";

const router = Router();

router.post("/", criarReceita)
router.get("/", listarReceitas)
router.get("/:id", buscarReceita)
router.put("/:id", atualizarReceita)
router.delete("/:id", deletarReceita)



//ROTAS PARAS IMAGENS
router.post("/:id/imagem", imageUpload.single("imagem"), cadastrarCapaReceita);

export default router;      