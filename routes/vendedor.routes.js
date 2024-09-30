module.exports = (app) => {
    const vendedores = require ("../controllers/vendedor.controller.js");
    var router = require ("express").Router();

    router.post("/", vendedores.create);
    router.get("/", vendedores.findAll);
    router.get("/:id", vendedores.findOne,);
    router.put("/:id", vendedores.update);
    router.delete("/:id", vendedores.delete);
    router.delete("/", vendedores.deleteAll);

    app.use("/vendedores", router);
};