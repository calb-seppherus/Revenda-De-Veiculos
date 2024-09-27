module.exports = (sequelize,Sequelize) => {
    const Vendedor = sequelize.define("vendedor", {
        nome: { type: Sequelize.STRING },
        senha: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        foto: { type: Sequelize.STRING },
        cpf: { type: Sequelize.STRING },
    },
        { freezeTableName: true }
    );
    return Vendedor;
};