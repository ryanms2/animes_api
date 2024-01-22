const connection = require("../db/conn");

const getAllAnimesF = async (idUser) => {
    const id_User = idUser;

    const query = 'SELECT id_anime FROM animes_favoritos_usuario WHERE id_usuario= ?';
    const [idAnimesF] = await connection.execute(query, [id_User]);
    
    if (idAnimesF.length == 0) {
        return {message: "Você não tem animes favoritos"};
    };

    const idAnimes = (idAnimesF) => idAnimesF.id_anime;
    const obtIdAnimes = idAnimesF.map(idAnimes);
    const queryOne = `SELECT * FROM animes WHERE id IN (${obtIdAnimes})`;
    const [animesF] = await connection.execute(queryOne);
    

    return animesF;
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

const checkAdded = async (anime) => {
    const { titulo } = anime;

    const query = 'SELECT titulo FROM animes WHERE titulo= ?';
    
    try {
       const [verify] = await connection.execute(query, [titulo]);
        
       if (verify.length > 0) {
        return {message: "esse anime já foi adicionado"};
       } else {
        return {pass: 1};
       }
    } catch (error) {
        
    }
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
    getAllAnimesF,
    createAnime,
    deleteAnime,
    updateAnime,
    selectAnime,
    checkAdded
};