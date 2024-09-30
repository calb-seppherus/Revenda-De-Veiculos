module.exports = (app) => {

    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");
    var router = require ("express").Router();
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/vendedor");
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
        + `/uploads/vendedor/${req.params.arquivo}`;
        fs.readFile(arquivo, function (err, data) {
            res.contentType("png");
            res.send(data);
        });
    });

    const vendedores = require ("../controllers/vendedor.controller.js");

    router.post("/", vendedores.create);
    router.get("/", vendedores.findAll);
    router.get("/:id", vendedores.findOne,);
    router.put("/:id", vendedores.update);
    router.delete("/:id", vendedores.delete);
    router.delete("/", vendedores.deleteAll);

    app.use("/vendedores", router);
};