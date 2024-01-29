const router = require("express").Router();
const animeController = require("../controllers/animeController");
const animesMiddleware = require("../middlewares/animesMiddleware");
const usuarioMiddleware = require("../middlewares/usuarioMiddleware");

router.post("/animesFavoritos",
usuarioMiddleware.checkToken,
animeController.getAllAnimesF);

router.get("/animes/:id",
usuarioMiddleware.checkToken,
animeController.selectAnime);

router.post("/animes",
usuarioMiddleware.checkToken,
animesMiddleware.validaTitulo,
animeController.checkAdd,
animeController.createAnime
);

router.delete("/animes",
usuarioMiddleware.checkToken,
animeController.deleteAnime);

router.put("/animes/:id",
usuarioMiddleware.checkToken,
animesMiddleware.validaTitulo,
animesMiddleware.validaImagem,
animeController.updateAnime);

module.exports = router;