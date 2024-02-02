const connection = require("../db/conn");

const getAllAnimesF = async (idUser) => {
    const id_User = idUser;

    const query = 'SELECT id_anime FROM animes_favoritos_usuario WHERE id_usuario= ?';

    try {
        const [idAnimesF] = await connection.execute(query, [id_User]);
    
        if (idAnimesF.length == 0) {
            return {message: "Você não tem animes favoritos"};
        };
    
        const idAnimes = (idAnimesF) => idAnimesF.id_anime;
        const obtIdAnimes = idAnimesF.map(idAnimes);
        const queryOne = `SELECT * FROM animes WHERE id IN (${obtIdAnimes})`;
        const [animesF] = await connection.execute(queryOne);
    
        return animesF;
    } catch (error) {
        console.log(error);
    };
};

const createAnime = async (anime) => {
    const { titulo, imagem } = anime;
    const dataUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO animes (titulo, imagem, criado_em) VALUES (?, ?, ?)';
    try {
       const [createdAnime] = await connection.execute(query, [titulo, imagem, dataUTC]); 
       const id = createdAnime.insertId;
       return {message: "anime adicionado com sucesso", insertId: id};
    } catch (error) {
        console.log(error);
    }
};

const checkAdded = async (anime, id) => {
    const { titulo } = anime;
    const idUser = id;

    const query = 'SELECT id FROM animes WHERE titulo = ?';
    const queryOne = 'SELECT id_anime FROM animes_favoritos_usuario WHERE id_usuario = ?';
    const queryTwo = 'INSERT INTO animes_favoritos_usuario (id_usuario, id_anime) VALUES (?, ?)';
    
    try {
        const [verify] = await connection.execute(query, [titulo]);

        if (verify.length === 0) {
            return { pass: 1 };
        }

        const idAnime = verify[0].id;

        const [verifyOne] = await connection.execute(queryOne, [idUser]);

        const idsAnimes = verifyOne.map(item => item.id_anime);

        if (idsAnimes.includes(idAnime)) {
            return { message: "esse anime já foi adicionado" };
        } else {
            const inserir = await connection.execute(queryTwo, [idUser, idAnime]);
            return { message: "anime adicionado com sucesso" };
        }
    } catch (error) {
        console.log(error);
        return { error: "Erro na verificação" };
    }
};

const deleteAnime = async (idAnime, idUser) => {
    const query = `DELETE FROM animes_favoritos_usuario
    WHERE id_usuario = ? AND id_anime = ?;`;

    try {
        const [removedAnime] = await connection.execute(query, [idUser, idAnime]);
        return {message: "Anime favorito removido com sucesso"}; 
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getAllAnimesF,
    createAnime,
    deleteAnime,
    checkAdded
};