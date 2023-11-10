const sequelize = require('./_database');
const {DataTypes} = require("sequelize");
const {Product} = require("./index");
const {Cart} = require("./index");

const cart_product = sequelize.define('Product_order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    CartId: {
        type: DataTypes.INTEGER,
        references: {
            model: Cart,
            key: 'id'
        }
    }
})
module.exports = cart_product