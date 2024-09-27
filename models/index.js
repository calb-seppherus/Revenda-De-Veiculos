const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    config
);

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.veiculos = require("./veiculo.model.js")(sequelize, Sequelize);
db.clientes = require("./vendedor.model.js")(sequelize, Sequelize);

module.exports = db;