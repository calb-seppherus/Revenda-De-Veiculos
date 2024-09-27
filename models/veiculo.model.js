module.exports = (sequelize,Sequelize) => {
    const Veiculo = sequelize.define("veiculo", {
        marca: { type: Sequelize.STRING },
        modelo: { type: Sequelize.STRING },
        quilometragem: { type: Sequelize.INTEGER },
        datafab: { type: Sequelize.DATEONLY },
        preco: { type: Sequelize.FLOAT },
        crlv: { type: Sequelize.STRING }
    },
        { freezeTableName: true }
    );
    return Veiculo;
};