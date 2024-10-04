module.exports = (app) => {

    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");
    var router = require ("express").Router();

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/cliente");
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
    });

    router.post("/upload/", upload.single("file"), async (req,res) => {
        res.send({
            upload: true,
            file: req.file
        });
    });

    router.get("/upload/:arquivo", (req,res) => {
        const arquivo = path.dirname(__dirname)
        + `/uploads/cliente/${req.params.arquivo}`;
        fs.readFile(arquivo, function (err, data) {
            res.contentType("png");
            res.send(data);
        });
    });

    const clientes = require ("../controllers/cliente.controller.js");

    router.post("/", clientes.create);
    router.get("/", clientes.findAll);
    router.get("/:id", clientes.findOne,);
    router.put("/:id", clientes.update);
    router.delete("/:id", clientes.delete);
    router.delete("/", clientes.deleteAll);

    app.use("/clientes", router);
};