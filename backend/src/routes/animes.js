const router = require("express").Router();
const animeController = require("../controllers/animeController");
const animesMiddleware = require("../middlewares/animesMiddleware");

router.get("/animes", animeController.getAll);

router.get("/animes/:id", animeController.selectAnime);

router.post("/animes",animesMiddleware.validaTitulo, animeController.createAnime);

router.delete("/animes/:id", animeController.deleteAnime);

router.put("/animes/:id", animesMiddleware.validaTitulo, animesMiddleware.validaImagem, animeController.updateAnime);

module.exports = router;