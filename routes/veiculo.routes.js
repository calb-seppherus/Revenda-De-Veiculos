module.exports = (app) => {
    const veiculos = require ("../controllers/veiculo.controller.js");
    var router = require ("express").Router();

    router.post("/", veiculos.create);
    router.get("/", veiculos.findAll);
    router.get("/:id", veiculos.findOne,);
    router.put("/:id", veiculos.update);
    router.delete("/:id", veiculos.delete);
    router.delete("/", veiculos.deleteAll);

    app.use("/veiculos", router);
};