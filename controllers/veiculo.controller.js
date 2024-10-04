const db = require("../models");
const Veiculo = db.veiculos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const veiculo = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        quilometragem: req.body.quilometragem,
        datafab: req.body.datafab,
        preco: req.body.preco,
        crlv: req.body.crlv,
        veiculoId: req.body.veiculoId,
    };

    Veiculo.create(veiculo)
    .then(data => res.send(data))
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao criar o veiculo"})
    );

};

exports.findAll = (req, res) => {
    Veiculo.findAll().then((data) => res.send(data))
    .catch((err) =>
       res.status(500).send({ message: err.message || "Erro ao buscar veiculos" })
    );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Veiculo.findByPk(id).then(data => {
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send({message:"não foi possivel encontrar este veiculo com o id" + id});
        }
    })
    .catch(err => 
        res
        .status(500)
        .send({mesage: err.message || "erro ao buscar por veiculo"}))
};

exports.update = (req, res) => {
    const id = req.params.id

    Veiculo.update(req.body, {where: {id: id}})
    .then((num) => {
        if(num == 1){
            res.send({message:"Veiculo atualizado com sucesso"})
        }
        else{
            res.status(404).send({message:"Não foi possivel atualizar. Req,body vazio ou veiculo não encontrado."});
        }
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Veiculo.destroy({ where: {id: id}}).then((num) => {
        if (num == 1){
            res.send({message:"veiculo removido"})
        }
        else{
            res.send({message: "Veiculo não encontrado. Id " + id})
        }
    })
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao deletar veiculo" })
    );
};

exports.deleteAll = (req, res) => {
    Veiculo.destroy({
        where: {},
        truncate: false,
    })
    .then((num) => {
        res.send({ message: `${num} veiculos foram removidos`});
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro a deletar todos os veiculos "});
    });
};