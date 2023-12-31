const sequelize = require('./_database');
const {DataTypes} = require("sequelize");

const Product = sequelize.define('Product', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})
module.exports = Product