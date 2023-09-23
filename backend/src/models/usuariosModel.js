const connection = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registro = async(usuario) => {
    const { nome, email, senha } = usuario;
    

    const salt = await bcrypt.genSalt(12);
    const hashedSenha = await bcrypt.hash(senha, salt);

    try {

        const [criadoUsuario] = await connection.query('INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)', [nome, hashedSenha, email]);

        return {message: "Usuário criado com sucesso!"};
        
    } catch (error) {
        console.log(error);

        return {message: "Erro ao inserir no banco de dados."};

    };

    
};

const login = async (usuario) => {
    const { email, senha } = usuario;

    const [user] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    const [senhaDB] = await connection.query('SELECT senha FROM usuarios WHERE email = ?', [email]);

    const checkSenha = await bcrypt.compare(senha, senhaDB[0].senha);
    
      try {
        const secret = process.env.SECRET;
    
        const token = jwt.sign(
          {
            email: user[0].email,
            id: user[0].id,
          },
          secret
        );
    
        return { message: "Autenticação realizada com sucesso!", token };
      } catch (error) {
        return { message: error };
      };
};

const redefinirSenha = async(senha, repitaSenha, id) => {
  const senhaUser = senha;
  console.log(senhaUser)
  const repitaSenhaUser = repitaSenha;
  const idUser = 1;

  const [senhaDB] = await connection.query('SELECT senha FROM usuarios WHERE id = ?', [idUser]);
  const checkSenha = await bcrypt.compare(senhaUser, senhaDB[0].senha);
  console.log(checkSenha);
  
};

const logado = async(id) => {
  const [user] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  const queryAnimesAll = 'SELECT * FROM animes_favoritos_usuario WHERE id_usuario = ?';
  const [animesAll] = await connection.execute(queryAnimesAll, [user[0].id]);
  console.log(animesAll[0].id_anime);

  const query = 'INSERT INTO animes_favoritos_usuario (id_usuario, id_anime) VALUES (?, ?)';

  const [idAnime] = await connection.query('SELECT id FROM animes WHERE id = ?', [id]);

  return user;
};

const addAnimeFavorito = async(decodedId, idAnime) => {
  const idUser = decodedId;
  const idAnimee = idAnime;
  
  const queryAnimesUsuario = 'SELECT id_anime FROM animes_favoritos_usuario WHERE id_usuario = ?';
  const [verifica] = await connection.execute(queryAnimesUsuario, [idUser]);
  const veriAnimes = (verifica) => verifica.id_anime;
  const obtAnimes = verifica.map(veriAnimes);
  console.log(verifica.map(veriAnimes));
  for (let i = 0; i < obtAnimes.length; i++) {

    if (obtAnimes[i] == idAnimee) {
    return {message: "Esse anime já foi adicionado a lista"};
    };
    
  };
  
  try {
    const query = 'INSERT INTO animes_favoritos_usuario (id_usuario, id_anime) VALUES (?, ?)';
    const add = await connection.execute(query, [idUser, idAnimee]);

    return {message: "anime adicionado com sucesso!"};
  } catch (error) {
    console.log(error);
    return {message: "Erro ao adicionar o anime."};
  };
  
};

module.exports = {
    registro,
    login,
    logado,
    addAnimeFavorito,
    redefinirSenha
};