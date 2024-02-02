const usuarioModel = require("../models/usuariosModel");

const registro = async(req, res) => {

    const usuarios = await usuarioModel.registro(req.body);

    res.status(200).json(usuarios);
};

const login = async(req, res) => {
    const usuario = await usuarioModel.login(req.body);

    res.status(200).json(usuario);
};

const redefinirSenha = async(req, res) => {
    const { repitaSenha } = req.body;

    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;

    const redefinido = await usuarioModel.redefinirSenha(repitaSenha, decodedId);

    res.status(200).json(redefinido);
};

const redefinirNome = async(req, res) => {
    const { repitaNome } = req.body;

    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;

    const redefinido = await usuarioModel.redefinirNome(repitaNome, decodedId);

    res.status(200).json(redefinido);
};

const logado = async(req, res) => {
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;
    const dados = await usuarioModel.logado(decodedId);

    res.status(200).json(dados);
};

const addAnimeFavorito = async(req, res) => {
    const { idAnime } = req.body;

    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;

    const resposta = await usuarioModel.addAnimeFavorito(decodedId, idAnime);

    res.status(200).json(resposta);
};

module.exports = {
    registro,
    login,
    logado,
    addAnimeFavorito,
    redefinirSenha,
    redefinirNome
};