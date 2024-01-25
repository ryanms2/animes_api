const router = require("express").Router();

const usuarioController = require("../controllers/usuarioController");
const usuarioMiddleware = require("../middlewares/usuarioMiddleware");

router.post("/usuario/registro",
usuarioMiddleware.validaEmail,
usuarioMiddleware.validaNome,
usuarioMiddleware.validaSenha,
usuarioMiddleware.validaUsuario,
usuarioController.registro);

router.post("/usuario/login",
usuarioMiddleware.emailExiste,
usuarioMiddleware.validaSenhaLogin,
usuarioController.login);

router.post("/usuario/logado",
usuarioMiddleware.usuarioExiste,
usuarioMiddleware.checkToken,
usuarioController.logado);

router.post("/usuario/addAnime",
usuarioMiddleware.checkToken,
usuarioController.addAnimeFavorito);

router.post("/usuario/redefinirSenha",
usuarioMiddleware.checkToken,
usuarioMiddleware.validaSenhaRedefinir,
usuarioController.redefinirSenha);

router.post("/usuario/redefinirNome",
usuarioMiddleware.checkToken,
usuarioMiddleware.validaNomeRedefinir,
usuarioController.redefinirNome)

module.exports = router;