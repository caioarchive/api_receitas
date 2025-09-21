import chefeModel from "../models/chefModel.js"


export const cadastrarChefes = async (request, response) => {
    const { nome, biografia, especialidade, experiencia, nacionalidade } = request.body;

    if (!nome) {
        response.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }

    if (!biografia) {
        response.status(400).json({
            erro: "Campo biografia inválido",
            mensagem: "O campo biografia não pode ser nulo"
        })
        return
    }

    if (!especialidade) {
        response.status(400).json({
            erro: "Campo data_nascimento inválido",
            mensagem: "O campo data_nascimento não pode ser nulo"
        })
        return
    }

    if (!experiencia) {
        response.status(400).json({
            erro: "Campo nacionalidade inválido",
            mensagem: "O campo nacionalidade não pode ser nulo"
        })
        return
    }
    if (!nacionalidade) {
        response.status(400).json({
            erro: "Campo nacionalidade inválido",
            mensagem: "O campo nacionalidade não pode ser nulo"
        })
        return
    }

    const chefe = {
        nome,
        biografia,
        especialidade,
        experiencia,
        nacionalidade
    }

    try {
        const novoChefe = await chefeModel.create(chefe)
        response.status(201).json({ mensagem: "Chefe cadastrado com sucesso", novoChefe })
    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: "Erro interno ao cadastrar chefe" })
    }
}
export const listarTodosChefes = async (request, response) => {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const chefes = await chefeModel.findAndCountAll({
            offset,
            limit
        })
        const totalPaginas = Math.ceil(chefes.count / limit)
        response.status(200).json({
            totalChefes: chefes.count,
            totalPaginas,
            paginaAtual: page,
            chefesPorPagina: limit,
            chefes: chefes.rows
        })

        console.log("Total de Chefes", chefes.count)
        console.log("Chefes", chefes.rows)
    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: "Error interno ao listar chefes" })
    }
}

export const buscarChefePorId = async (request, response) => {
    try {
        const { id } = request.params;
        const buscarChefe = await chefeModel.findByPk(id);
        if (buscarChefe) {
            response.status(200).json({ mensagem: "ID válido, o chefe é:", buscarChefe });

        } else {
            response.status(404).json({ mensagem: 'Chefe não encontrado' })
            console.log(error)
        }
    } catch (error) {
        response.status(500).json({ mensage: 'Erro ao buscar a chefe' })
        console.log(error)
    }
};

export const atualizarChefe = async (request, response) => {
    try {
        const { id } = request.params;
        const { nome, biografia, especialidade, experiencia, nacionalidade } = request.body;
        const atualizarChefe = await chefeModel.findByPk(id);


        if (atualizarChefe) {
            atualizarChefe.nome = nome;
            atualizarChefe.biografia = biografia;
            atualizarChefe.especialidade = especialidade;
            atualizarChefe.experiencia = experiencia;
            atualizarChefe.nacionalidade = nacionalidade;
            await atualizarChefe.save();
            console.log('Chefe atualizado:', atualizarChefe)
            response.status(200).json({ mensagem: "Dados do chefe atualizado com sucesso" });

        } else {
            response.status(404).json({ message: 'Chefe não encontrado' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Erro ao atualizar dados do chefe', error: error.message });
    }
}

export const deletarChefe = async (request, response) => {
    try {
        const { id } = request.params
        const deletarChefe = await chefeModel.findByPk(id)

        if (deletarChefe) {
            await deletarChefe.destroy()
            console.log("Chefe deletado com sucesso.")
            response.status(204).send()

        } else {
            response.status(404).json({ message: 'Erro ao deletar chefe', error: error.message });
        }

    } catch (error) {
        response.status(500).json({ message: 'Erro interno ao deletar chefe', error: error.message });
        console.log(error)
    }
}

