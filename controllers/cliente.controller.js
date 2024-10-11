const db = require("../models");
const Cliente = db.clientes;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const secretKey = 'revenda_veiculos_secret_key';

exports.create = (req, res) => {
    const cliente = {
        nome: req.body.nome,
        senha: bcrypt.hashSync(req.body.senha, 10),
        email: req.body.email,
        foto: req.body.foto,
        cpf: req.body.cpf,
        veiculoId: req.body.veiculoId,
    };

    Cliente.create(cliente)
    .then(data => res.send(data))
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao criar o cliente"})
    );

};

exports.findAll = (req, res) => {
    Cliente.findAll().then((data) => res.send(data))
    .catch((err) =>
       res.status(500).send({ message: err.message || "Erro ao buscar clientes" })
    );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id).then(data => {
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send({message:"não foi possivel encontrar este cliente com o id" + id});
        }
    })
    .catch(err => 
        res
        .status(500)
        .send({mesage: err.message || "erro ao buscar por cliente"}))
};

exports.update = (req, res) => {
    const id = req.params.id

    Cliente.update(req.body, {where: {id: id}})
    .then((num) => {
        if(num == 1){
            res.send({message:"Cliente atualizado com sucesso"})
        }
        else{
            res.status(404).send({message:"Não foi possivel atualizar. Req,body vazio ou cliente não encontrado."});
        }
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Cliente.destroy({ where: {id: id}}).then((num) => {
        if (num == 1){
            res.send({message:"cliente removido"})
        }
        else{
            res.send({message: "Cliente não encontrado. Id " + id})
        }
    })
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao deletar cliente" })
    );
};

exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false,
    })
    .then((num) => {
        res.send({ message: `${num} clientes foram removidos`});
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro a deletar todos os clientes "});
    });
};

exports.login = (req, res) => {
    Cliente.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then((cliente) => {
        if (!cliente) {
            return res.status(404).send({ message: "Cliente não encontrado" });
        }

        var passwordIsValid = bcrypt.compareSync (req.body.senha,cliente.senha);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null, message: "senha invalida!",
            });
        }
        var token = jwt.sign({ id: cliente.id }, secretKey, {
            expiresIn: "1h"
        });
        res.status(200).send({ cliente: cliente, accessToken: token });
    })
    .catch((err) => res.status(500).send({ message: err.message }))
};