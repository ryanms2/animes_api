const animesModel = require("../models/animesModel");

const getAll = async (_req, res) => {

    const animes = await animesModel.getAll();
    return res.status(200).json(animes);
};

const createAnime = async (req, res) => {
    const createdAnime = await animesModel.createAnime(req.body);

    return res.status(201).json(createdAnime);
};

const deleteAnime = async (req, res) => {
    const { id } = req.params;

    await animesModel.deleteAnime(id);
    return res.status(204).json();
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
    getAll,
    createAnime,
    deleteAnime,
    updateAnime,
    selectAnime
};