import { Router } from "express"; 
import { atualizarUsuario, buscarUsuarioPorId, cadastrarUsuario, deletarUsuario, listarTodosUsuarios, login, logout } from "../controllers/usuarioControllers.js";

const router = Router();

router.post("/", cadastrarUsuario)
router.get("/", listarTodosUsuarios)
router.put("/:id", atualizarUsuario)
router.get("/:id", buscarUsuarioPorId)
router.delete("/:id", deletarUsuario)
router.post('/login', login);
router.post('/logout', logout);

export default router;  