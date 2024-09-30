const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");


const app = express();

var corsOptions = {
    origin:
    "Aqui informamos quais urls permitimos que sejam conectadas ao nosso backend. Quando tivermos um frontend, iremos alterar para a url do nosso frontend",
};

db.sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send("Desenvolvimento de Aplicações WEB II");
});

require("./routes/cliente.routes" )(app);
require("./routes/veiculo.routes" )(app);
require("./routes/vendedor.routes" )(app);

app.listen(8000, function (req, res) {
    console.log("App rodando na porta 8000" );
});