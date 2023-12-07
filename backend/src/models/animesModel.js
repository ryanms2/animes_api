const connection = require("../db/conn");

const getAll = async () => {
    const [ animes ] = await connection.execute("SELECT * FROM animes");

    return animes;
};

const createAnime = async (anime) => {
    const { titulo, imagem } = anime;

    const dataUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO animes (titulo, imagem, criado_em) VALUES (?, ?, ?)';

    const [createdAnime] = await connection.execute(query, [titulo, imagem, dataUTC]);

    return {insertId: createdAnime.insertId};
};

const deleteAnime = async (id) => {
    const [removedAnime] = await connection.execute('DELETE FROM animes WHERE id=?', [id]);
    return removedAnime;
};

const updateAnime = async (id, anime) => {
    const { titulo, imagem } = anime;
    
    const query = 'UPDATE animes SET titulo= ?, imagem= ? WHERE id= ?';

    const [updatedAnime] = await connection.execute(query, [titulo, imagem, id]);
    try {
        return {message: "Anime atualizado com sucesso."};
    } catch (error) {
        console.log(error);
        return {message: "Houve um erro ao atualizar o anime."};
    };
};

const selectAnime = async (id) => {
    const anime = await connection.execute('SELECT * FROM animes WHERE id= ?', [id]);

    return anime;
}

module.exports = {
    getAll,
    createAnime,
    deleteAnime,
    updateAnime,
    selectAnime
};