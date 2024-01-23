
const validaUsuario = async(req, res, next) => {
    const {body} = req;

    const connection = require("../db/conn");

    const [user] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [body.email]);

    if (user.length > 0) {

        return res.status(409).json({message: "O usuário já existe."});
    };

    next();
};


const validaEmail = (req, res, next) => {
    const {body} = req;
    if (body.email == undefined || !body.email || body.email < 12) {

        return res.status(409).json({message: "Insira um email válido!"});
    };

    next();
};

const validaSenha = (req, res, next) => {
    const {body} = req;

    if (body.senha == undefined || !body.senha || body.senha < 6) {

        return res.status(409).json({message: "Insira uma senha válida!"});
    };

    if (body.senha != body.repitaSenha) {
        return res.status(422).json({message: "As senhas estão diferentes, tente novamente."});
    }

    next();
};

const validaNome = (req, res, next) => {
   const {body} = req;

   if (body.nome == '' || !body.nome) {
    return res.status(409).json({message: "O nome não pode ser vazio."});
   };
   
   if (body.nome.length < 5) {
    return res.status(409).json({message: "O nome deve ter os caracteres minimos."})
   }

   next();
};



const emailExiste = async(req, res, next) => {
    const {body} = req;

    const connection = require("../db/conn");

    const [user] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [body.email]);

    if (user.length == 0) {

        return res.status(409).json({message: "O usuário não foi encontrado."});
    };

    next();
};

const validaSenhaLogin = async(req, res, next) => {
    const {body} = req;

    if (body.senha == undefined || !body.senha || body.senha.length < 6) {
        return res.status(409).json({msg: "Insira uma senha válida"});
    };

    const bcrypt = require("bcrypt");
    const connection = require("../db/conn");

    const [senhaDB] = await connection.query('SELECT senha FROM usuarios WHERE email = ?', [body.email]);

    const checkSenha = await bcrypt.compare(body.senha, senhaDB[0].senha);

    if (!checkSenha) {
        return res.status(409).json({ message: "Senha incorreta" });
      };

    next();
};

const validaSenhaRedefinir = async(req, res, next) => {
    const {body} = req;

    if (body.senha == undefined || !body.senha || body.senha.length < 6) {
        return res.status(409).json({message: "Insira uma senha válida!"});
    };

    if (body.repitaSenha == undefined || !body.repitaSenha) {
        return res.status(409).json({message: "As senhas estão diferentes, tente novamente."});
    };

    if (body.novaSenha == undefined || !body.novaSenha || body.novaSenha.length < 6) {
        return res.status(409).json({message: "Insira uma nova senha válida."});
    };
    
    if (body.repitaSenha !== body.novaSenha) {
        return res.status(409).json({message: "As senhas devem ser iguais."});
    };

    const bcrypt = require("bcrypt");
    const connection = require("../db/conn");

    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const secret = process.env.SECRET;
  
    const decoded = jwt.verify(token, secret);
    console.log(decoded.id);
    const userId = decoded.id;

    const [senhaDB] = await connection.query('SELECT senha FROM usuarios WHERE id = ?', [userId]);

    const checkSenha = await bcrypt.compare(body.senha, senhaDB[0].senha);

    if (!checkSenha) {
        return res.status(409).json({ message: "Senha incorreta" });
    };

    next();
};

const validaNomeRedefinir = (req, res, next) => {
    const {body} = req;

    if (body.repitaNome == undefined || !body.repitaNome || body.repitaNome.length < 5) {
        return res.status(409).json({message: "Insira um nome válido."});
    };

    next();
};

const checkToken = (req, res, next) => {

    const jwt = require("jsonwebtoken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
       return res.status(401).json({ msg: "Acesso negado!" }); 
    };
    try {
      const secret = process.env.SECRET;
  
      const decoded = jwt.verify(token, secret);
      console.log(decoded.id);
      
      if (!decoded.id) {
        return res.status(401).json({message: "Login não autorizado, tente novamente."});
      };
      
    } catch (err) {
      return res.status(400).json({ msg: "O Token é inválido!"});
    };
    next();
  };

  const usuarioExiste = async(req, res, next) => {
    const body = req.params.id;

    const connection = require("../db/conn");
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    const [user] = await connection.execute(query, [body]);

    if (user == '' || user == 0 || !user || user == undefined) {
        return res.status(404).json({message: "Usuário não existe."});
    };
    next();
  };
    
module.exports = {
    validaEmail,
    validaSenha,
    validaNome,
    validaUsuario,
    emailExiste,
    validaSenhaLogin,
    checkToken,
    usuarioExiste,
    validaSenhaRedefinir,
    validaNomeRedefinir
};