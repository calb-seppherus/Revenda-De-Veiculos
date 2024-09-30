const db = require("../models");
const Vendedor = db.vendedores;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const vendedor = {
        nome: req.body.nome,
        senha: req.body.senha,
        email: req.body.email,
        foto: req.body.foto,
        cpf: req.body.cpf,
        vendedorId: req.body.vendedorId,
    };

    Vendedor.create(vendedor)
    .then(data => res.send(data))
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao criar o vendedor"})
    );

};

exports.findAll = (req, res) => {
    Vendedor.findAll().then((data) => res.send(data))
    .catch((err) =>
       res.status(500).send({ message: err.message || "Erro ao buscar vendedor" })
    );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Vendedor.findByPk(id).then(data => {
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send({message:"não foi possivel encontrar este vendedor com o id" + id});
        }
    })
    .catch(err => 
        res
        .status(500)
        .send({mesage: err.message || "erro ao buscar por vendedor"}))
};

exports.update = (req, res) => {
    const id = req.params.id

    Vendedor.update(req.body, {where: {id: id}})
    .then((num) => {
        if(num == 1){
            res.send({message:"Vendedor atualizado com sucesso"})
        }
        else{
            res.status(404).send({message:"Não foi possivel atualizar. Req,body vazio ou vendedor não encontrado."});
        }
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Vendedor.destroy({ where: {id: id}}).then((num) => {
        if (num == 1){
            res.send({message:"vendedor removido"})
        }
        else{
            res.send({message: "Vendedor não encontrado. Id " + id})
        }
    })
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao deletar vendedor" })
    );
};

exports.deleteAll = (req, res) => {
    Vendedor.destroy({
        where: {},
        truncate: false,
    })
    .then((num) => {
        res.send({ message: `${num}vendedores foram removidos`});
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro a deletar todos os vendedores "});
    });
};