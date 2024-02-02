const animesModel = require("../models/animesModel");

const getAllAnimesF = async (req, res) => {
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;
    const animes = await animesModel.getAllAnimesF(decodedId);
    
    return res.status(200).json(animes);
};

const createAnime = async (req, res) => {
    const createdAnime = await animesModel.createAnime(req.body);
    
    return res.status(201).json(createdAnime);

};

const checkAdd = async (req, res, next) => {
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;
    try {
        const rec = await animesModel.checkAdded(req.body, decodedId);
    if (rec.message === "esse anime já foi adicionado") {
        return res.status(200).json(rec);
        
    };
    
    if (rec.message === "anime adicionado com sucesso") {
        return res.status(200).json(rec);
        
    } else {
        next();
    };
    } catch (error) {
        console.log(error);
    };
};

const deleteAnime = async (req, res) => {
    const { id } = req.body;
    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    const decodedId = decoded.usuario.id;

    const deletado = await animesModel.deleteAnime(id, decodedId);
    return res.status(204).json(deletado);
};

const updateAnime = async (req, res) => {
    const { id } = req.params;
    const resposta = await animesModel.updateAnime(id, req.body);
    return res.status(200).json(resposta);
};

const selectAnime = async (req, res) => {
    const { id } = req.params;

    const [anime] = await animesModel.selectAnime(id);

    if (anime.length == 0) {
        return res.status(400).json({message: "não encontrado"});
    };

    return res.status(200).json(anime);
}

module.exports = {
    getAllAnimesF,
    createAnime,
    deleteAnime,
    updateAnime,
    selectAnime,
    checkAdd
};