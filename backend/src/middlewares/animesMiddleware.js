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

const validaImagem = (req, res, next) => {
    const { body } = req;

    if (body.imagem == undefined) {
        return res.status(400).json({message: 'A imagem é necessária.'});
    };

    if (body.imagem == '') {
        return res.status(400).json({message: 'A imagem não pode estar vazia.'});
    };

    next();
};

module.exports = {
    validaTitulo,
    validaImagem
};