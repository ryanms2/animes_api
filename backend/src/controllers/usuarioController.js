const usuarioModel = require("../models/usuariosModel");

const registro = async(req, res) => {

    const usuarios = await usuarioModel.registro(req.body);

    res.status(200).json(usuarios);
};

const login = async(req, res) => {
    const usuario = await usuarioModel.login(req.body);

    res.status(200).json(usuario);
};

const logado = async(req, res) => {
    const id = req.params.id
    const dados = await usuarioModel.logado(id);

    res.status(200).json(dados);
};

const addAnimeFavorito = async(req, res) => {
    const { idUsuario, idAnime } = req.body;

    const resposta = await usuarioModel.addAnimeFavorito(idUsuario, idAnime);

    res.status(200).json(resposta);
};

module.exports = {
    registro,
    login,
    logado,
    addAnimeFavorito
};