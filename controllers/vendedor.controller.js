const db = require("../models");
const Vendedor = db.vendedores;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const secretKey = 'revenda_veiculos_secret_key';

exports.create = (req, res) => {
    const vendedor = {
        nome: req.body.nome,
        senha: bcrypt.hashSync(req.body.senha, 10),
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
       res.status(500).send({ message: err.message || "Erro ao buscar vendedores" })
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
        res.send({ message: `${num} vendedores foram removidos`});
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro a deletar todos os vendedores "});
    });
};

exports.login = (req, res) => {
    Vendedor.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then((vendedor) => {
        if (!vendedor) {
            return res.status(404).send({ message: "vendedor não encontrado" });
        }

        var passwordIsValid = bcrypt.compareSync (req.body.senha,vendedor.senha);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null, message: "senha invalida!",
            });
        }
        var token = jwt.sign({ id: vendedor.id }, secretKey, {
            expiresIn: "1h"
        });
        res.status(200).send({ vendedor: vendedor, accessToken: token });
    })
    .catch((err) => res.status(500).send({ message: err.message }))
};