const sequelize = require('./_database');
const {DataTypes} = require("sequelize");

const Order = sequelize.define('Order', {
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
})
module.exports = Order