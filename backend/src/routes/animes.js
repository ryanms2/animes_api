const router = require("express").Router();
const animeController = require("../controllers/animeController");
const animesMiddleware = require("../middlewares/animesMiddleware");
const usuarioMiddleware = require("../middlewares/usuarioMiddleware");

router.post("/animesFavoritos",
usuarioMiddleware.checkToken,
animeController.getAllAnimesF);

router.post("/animes",
usuarioMiddleware.checkToken,
animesMiddleware.validaTitulo,
animeController.checkAdd,
animeController.createAnime
);

router.delete("/animes",
usuarioMiddleware.checkToken,
animeController.deleteAnime);

module.exports = router;