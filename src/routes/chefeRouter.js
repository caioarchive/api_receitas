import { Router } from "express";
import { atualizarChefe, buscarChefePorId, cadastrarChefes, deletarChefe, listarTodosChefes } from "../controllers/chefeControllers.js";

const router = Router();

router.post("/", cadastrarChefes)
router.get("/", listarTodosChefes)
router.get("/:id", buscarChefePorId)
router.put("/:id", atualizarChefe)
router.delete("/:id", deletarChefe)

export default router;