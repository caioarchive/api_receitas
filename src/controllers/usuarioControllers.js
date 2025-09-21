import usuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const cadastrarUsuario = async (request, response) => {
  const { nome, email, senha, telefone, endereco, tipoUsuario, ativo } = request.body;


  if (!nome) {
    return response.status(400).json({ mensagem: "O campo nome não pode ser nulo" });
  }

  if (!email) {
    return response.status(400).json({ mensagem: "O campo email não pode ser nulo" });
  }

  if (!senha) {
    return response.status(400).json({ mensagem: "O campo senha não pode ser nulo" });
  }

  if (!telefone) {
    return response.status(400).json({ mensagem: "O campo telefone não pode ser nulo" });
  }

  if (!tipoUsuario) {
    return response.status(400).json({ mensagem: "O campo tipoUsuario não pode ser nulo" });
  }

  if (ativo === undefined) {
    return response.status(400).json({ mensagem: "O campo ativo não pode ser nulo" });
  }

  const senhaHash = bcrypt.hashSync(senha, 10); // 10 = número de salt rounds

  try {
    const novoUsuario = await usuarioModel.create({
      nome, email, senha: senhaHash, telefone, endereco, tipoUsuario, ativo
    });

    return response.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: novoUsuario });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};

export const listarTodosUsuarios = async (request, response) => {
  try {
    const usuarios = await usuarioModel.findAll()

    response.status(200).json(usuarios)

    console.log("Usuários:", usuarios)
  } catch (error) {
    console.log(error)
    response.status(500).json({ mensagem: "Erro interno ao listar usuarios" })
  }
}

export const atualizarUsuario = async (request, response) => {
  try {
    const { id } = request.params;
    const { nome, email, senha, telefone, endereco, tipoUsuario, ativo } = request.body;
    const atualizarUsuario = await usuarioModel.findByPk(id);


    if (atualizarUsuario) {
      atualizarUsuario.nome = nome;
      atualizarUsuario.email = email;
      atualizarUsuario.senha = senha;
      atualizarUsuario.telefone = telefone;
      atualizarUsuario.endereco = endereco;
      atualizarUsuario.tipoUsuario = tipoUsuario;
      atualizarUsuario.ativo = ativo;
      
      await atualizarUsuario.save();

     
      response.status(200).json(atualizarUsuario);

    } else {
      response.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Erro ao atualizar chefe' });
  }
}

export const buscarUsuarioPorId = async (request, response) => {
  try {
    const { id } = request.params;
    const buscarUsuario = await usuarioModel.findByPk(id);
    if (buscarUsuario) {
      response.status(200).json({ mensagem: "Usuario cadastrado com Sucesso", buscarUsuario });

    } else {
      response.status(404).json({ mensagem: 'Usuario não encontrado' })
      console.log(error)
    }
  } catch (error) {
    response.status(500).json({ mensage: 'Erro ao buscar a usuario' })
    console.log(error)
  }
};

export const deletarUsuario = async (request, response) => {
  try {
    const { id } = request.params
    const deletarUsuario = await usuarioModel.findByPk(id)
    if (deletarUsuario) {
      await deletarUsuario.destroy()
      response.status(204).send()
    } else {
      response.status(404).json({ message: 'Erro ao deletar usuario', error: error.message });
    }
  } catch (error) {
    response.status(500).json({ message: 'Erro interno ao deletar usuario', error: error.message });
    console.log(error)
  }
}


const SECRET_KEY = "sua_chave_secreta"; 

export const login = async (request, response) => {
  const { email, senha } = request.body;

  if (!email || !senha) {
    return response.status(400).json({ mensagem: "Email e senha são obrigatórios" });
  }

  try {

    const usuario = await usuarioModel.findOne({ where: { email } })
    if (usuario) console.log("Senha do Banco de Dados:", usuario.senha);

    if (!usuario) {
      return response.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
      return response.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, funcao: usuario.funcao },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return response.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno ao fazer login" });
  }
};

const tokenBlacklist = [];

export const logout = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ mensagem: "Token não inserido!" });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    tokenBlacklist.push(token);

    return res.status(200).json({ mensagem: "Logout realizado com sucesso" });
  } catch (error) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
};
