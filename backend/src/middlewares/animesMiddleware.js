const validaTitulo = (req, res, next) => {
    const { body } = req;

    if (body.titulo == undefined) {
        return res.status(400).json({message: 'O titulo é necessário.'});
    };

    if (body.titulo == '') {
        return res.status(400).json({message: 'o título não pode estar vazio.'});
    };

    next();
}

module.exports = {
    validaTitulo
};