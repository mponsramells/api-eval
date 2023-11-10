const sequelize = require('./_database');
const {DataTypes} = require("sequelize");

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User