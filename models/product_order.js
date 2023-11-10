const sequelize = require('./_database');
const {DataTypes} = require("sequelize");

const Product_order = sequelize.define('Product_order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})
module.exports = Product_order