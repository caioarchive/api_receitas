import { response } from "express"
import { chefeModel, receitasModel } from "../models/association.js"


export const criarReceita = async (request, response) => {
  const { titulo, descricao, ingredientes, modoPreparo, tempoPreparo, porcoes, dificuldade, chefs } = request.body

  if (!titulo) {
    response.status(400).json({ mensagem: "O campo para inserir o titulo não pode ser vazio" })
    return
  }
  if (!descricao) {
    response.status(400).json({ mensagem: "O campo para inserir a descrição não pode ser vazio" })
    return
  }
  if (!ingredientes) {
    response.status(400).json({ mensagem: "O campo para inserir os ingredientes não pode ser vazio" })
    return
  }
  if (!modoPreparo) {
    response.status(400).json({ mensagem: "O campo para inserir o modo de preparo não pode ser vazio" })
    return
  }
  if (!tempoPreparo) {
    response.status(400).json({ mensagem: "O campo para inserir o tempo de preparo não pode ser vazio" })
    return
  }
  if (!porcoes) {
    response.status(400).json({ mensagem: "O campo para inserir as porções não pode ser vazio" })
    return
  }
  if (!dificuldade) {
    response.status(400).json({ mensagem: "O campo para inserir a dificuldade não pode ser vazio" })
    return
  }
  try {

    const chefsEncontrados = await chefeModel.findAll({
      where: {
        id: chefs
      }
    })

    if (chefsEncontrados.length !== chefs.length) {
      response.status(404).json({ mensagem: "Um ou mais IDs de chefs são inválidos ou não existem" })
      return
    }
    const receita = await receitasModel.create({
      titulo,
      descricao,
      ingredientes,
      modoPreparo,
      tempoPreparo,
      porcoes,
      dificuldade
    })

    await receita.addChefe(chefs)


    const receitaComChefs = await receitasModel.findByPk(receita.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: {
        model: chefeModel,
        attributes: { exclude: ["created_at", "updated_at"] },
        through: { attributes: [] }
      }
    })

    response.status(200).json({ mensagem: "Receita cadastrada com sucesso", receita: receitaComChefs })

  } catch (error) {
    response.status(500).json({ mensagem: "Erro interno do servidor ao tentar cadastrar a receita" })
    console.log(error)
  }
}

export const listarReceitas = async (request, response) => {
  const page = parseInt(request.query.page) || 1
  const limit = parseInt(request.query.limit) || 10
  const offset = (page - 1) * limit
  const { chef } = request.query;
  const chefSelecionado = chef ? { id: chef } : undefined;

  try {
    const receitas = await receitasModel.findAndCountAll({
      include: {
        model: chefeModel,
        attributes: ['id', 'nome'],
        through: { attributes: [] },
        where: chefSelecionado,
      },
      limit,
      offset,
      attributes: { exclude: ['created_at', 'updated_at'] }
    })

    const receitasFormatadas = receitas.rows.map((receita) => ({
      id: receita.id,
      titulo: receita.titulo,
      descricao: receita.descricao,
      ingredientes: receita.ingredientes,
      modoPreparo: receita.modoPreparo,
      tempoPreparo: receita.tempoPreparo,
      porcoes: receita.porcoes,
      dificuldade: receita.dificuldade,
      chefs: receita.chefes.map(chefe => ({
        id: chefe.id,
        nome: chefe.nome
      }))
    }))

    const totalDePaginas = Math.ceil(receitas.count / limit)

    response.status(200).json({
      totalReceitas: receitas.count,
      totalPaginas: totalDePaginas,
      paginaAtual: page,
      receitasPorPagina: limit,
      receitas: receitasFormatadas
    })
  } catch (error) {
    console.error(error)
    response.status(500).json({ mensagem: "Erro ao listar receitas" })
  }
}

export const buscarReceita = async (request, response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).json({ mensagem: "Id obrigatório" });
    return;
  }

  try {
    const receita = await receitasModel.findByPk(id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: {
        model: chefeModel,
        through: { attributes: [] },
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    });

    if (!receita) {
      response.status(404).json({ mensagem: "Receita não encontrada, digite novamente!" });
      return;
    }
    response.status(200).json(receita);

  } catch (error) {
    response.status(500).json({ mensagem: "Erro interno do servidor ao buscar receita" });
    console.log(error)
    return;
  }
};

export const atualizarReceita = async (request, response) => {
  try {
    const { id } = request.params;
    const { titulo, descricao, ingredientes, modoPreparo, tempoPreparo, porcoes, dificuldade } = request.body;
    const atualizarReceita = await receitasModel.findByPk(id);


    if (atualizarReceita) {
      ///atualizando receita:
      atualizarReceita.titulo = titulo;
      atualizarReceita.descricao = descricao;
      atualizarReceita.ingredientes = ingredientes;
      atualizarReceita.modoPreparo = modoPreparo;
      atualizarReceita.tempoPreparo = tempoPreparo;
      atualizarReceita.porcoes = porcoes;
      atualizarReceita.dificuldade = dificuldade;

      await atualizarReceita.save();

      response.status(200).json({ mensagem: "Receita atualizada com sucesso:", atualizarReceita });

    } else {
      response.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Erro ao atualizar a receita' });
  }
}

export const deletarReceita = async (request, response) => {
  try {
    const { id } = request.params
    const deletarReceita = await receitasModel.findByPk(id)

    if (deletarReceita) {

      await deletarReceita.destroy()
      response.status(204).send()

    } else {
      response.status(404).json({ message: 'Erro ao deletar receita' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Erro interno ao deletar receita' });
    console.log(error)
  }
}

export const cadastrarCapaReceita = async (request, response) => {
  const { id } = request.params;
  const { filename, path } = request.file;
  console.log(request.file)

  if (!id) {
    response.status(400).json({ mensagem: "O ID é obrigatório" })
    return
  }

  try {
    const receita = await receitasModel.findByPk(id)

    if (!receita) {
      response.status(404).json({ mensagem: "Receita não existe" })
      return
    }

    receita.imagemPrato = filename
    receita.imagem_url = path

    await receita.save()

    response.status(200).json({ mensagem: "Capa cadastrada", filename, path })
  } catch (error) {
    console.log(error)
    response.status(500).json({ mensagem: "Erro interno ao cadastrar capa" })
  }
}



// export const buscarImagemCapa = async (request, response) => {
//   const { filename } = request.params;

//   if (!filename) {
//     response.status(400).json({ mensagem: "filename é obrigatório" });
//     return;
//   }

//   try {
//     const receitas = await receitasModel.findOne({
//       where: {
//         imagem_capa: filename,
//       },
//     });

//     if (!receitas) {
//       response.status(404).json({ mensagem: "Capa da receita não encontrada" });
//       return;
//     }

//     const caminhoDaImagem = path.join(
//       __dirname,
//       "../../public/receitas/",
//       filename
//     );

//     console.log(caminhoDaImagem);

//     response.status(200).sendFile(caminhoDaImagem);
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json({ mensagem: "Erro interno ao buscar capa da receita" });
//   }
// };

// export const deletarImagemCapa = async (request, response) => {
//   const { id } = request.params;

//   if (!id) {
//     response.status(400).json({ mensagem: "ID é obrigatório" })
//     return
//   }

//   try {
//     const receitas = await receitasModel.findByPk(id)

//     if (!receitas) {
//       response.status(404).json({ mensagem: "Receita não encontrado" })
//       return
//     }

//     const encontrarArquivo = path.join(__dirname, '../../public/receitas', receitas.imagem_capa)

//     //Apaguei o arquivo do PC/pasta public
//     if (existsSync(encontrarArquivo)) {
//       unlinkSync(encontrarArquivo)
//     }

//     //modificar o nome do arquivo no banco de dados
//     receitas.imagem_capa = 'fileName.png'
//     receitas.imagem_url = 'caminhoDaImagem'

//     await receitas.save()

//     response.status(200).json({ mensagem: "A capa foi removida" })

//   } catch (error) {
//     response.status(500).json({ mensagem: "Erro inteno" })
//   }

// };
