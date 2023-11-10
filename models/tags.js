const sequelize = require('./_database');
const {DataTypes} = require("sequelize");

const Tags = sequelize.define('Tags', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

})
module.exports = Tags