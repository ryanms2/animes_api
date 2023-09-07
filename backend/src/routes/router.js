const router = require("express").Router();
const animes = require("./animes");
const usuarios = require("./usuarios");

router.use("/", animes);

router.use("/", usuarios);

module.exports = router;