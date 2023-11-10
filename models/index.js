const sequelize = require('./_database');

// Importation des models
const Product = require('./Product');
const User = require('./User');
const Tags = require('./Tags');
const Cart = require('./Cart');
const Order = require('./Order');
const Product_order = require('./Product_order');
// Définition des relations
Product.belongsToMany(Tags, {through: "product_tag"});
Tags.belongsToMany(Product, {through: "product_tag"});
User.hasMany(Order);
Order.belongsTo(User);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, {through: "cart_product"});
Cart.belongsToMany(Product, {through: "cart_product"});
Order.belongsToMany(Product, {through: Product_order});
Product.belongsToMany(Order, {through: Product_order});

//Synchronisation de la base
// async function syncDb() {
//     await sequelize.sync({alter: true});
// }
// syncDb()


module.exports = {
    Product: Product,
    User: User,
    Tags: Tags,
    Cart: Cart,
    Order: Order
}
