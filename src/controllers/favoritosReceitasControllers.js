import ReceitasFavoritasModel from "../models/ReceitasFavoritasModel.js";

export const adicionarFavorito = async (request, response) => {
    const { usuarioId, receitaId, categoria, observacoes, prioridade } = request.body;

    if (!usuarioId) {
        return response.status(400).json({ mensagem: "O campo usuarioId não pode ser está vazio!" });
    }

    if (!receitaId) {
        return response.status(400).json({ mensagem: "O campo usuarioId não pode ser está vazio!" });
    }

    const favorito = {
        usuarioId,
        receitaId,
        categoria: categoria || null,
        observacoes: observacoes || null,
        prioridade: prioridade || "media",
        tentativasPreparo: 0
    };

    try {
        const novoFavorito = await ReceitasFavoritasModel.create(favorito);
        response.status(201).json({ mensagem: "Receita adicionada aos favoritos com sucesso!", novoFavorito });
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: "Erro interno do servidor ao tentar adicionar a receita aos favoritos" });
    }
};