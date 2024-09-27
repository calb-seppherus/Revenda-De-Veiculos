module.exports = (sequelize,Sequelize) => {
        const Cliente = sequelize.define("cliente", {
            nome: { type: Sequelize.STRING },
            senha: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING },
            foto: { type: Sequelize.STRING },
            cpf: { type: Sequelize.STRING },
        },
            { freezeTableName: true }
        );
        return Cliente;
};