const express = require('express');
const router = express.Router();
const { Order } = require('../models/');
const userAuth = require("../middlewares/auth.js");
const {Product} = require("../models");
const {Product_order} = require("../models");

router.use(userAuth.authenticateUser);

router.get("/", function (req, res) {
    Order.findAll().then((users) => {
        res.json(users);
        res.status(200);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
router.get("/:id", function (req, res) {
    let orderId = req.params.id;
    Order.findByPk(orderId).then((order) => {
        res.json(order);
        res.status(200);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
//route pour créer une commande d'un produit en fonction de sa quantity
router.post("/addProductOrder", function (req, res) {
    let data = req.body;
    let UserId = req.user.id;
    let quantity = data.quantity;
    let ProductId = data.ProductId;
    Product.findByPk(ProductId).then((product) => {
        Order.create({
            total_amount: product.price * quantity,
            UserId: UserId,
        }).then((order) => {
            Product_order.create({
                quantity: quantity,
                ProductId: ProductId,
                OrderId: order.id,
            }).then((productOrder) => {
                res.json(productOrder);
                res.status(201);
            }).catch((error) => {
                console.log(error);
                res.status(500);
            });
        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });

});
router.use(userAuth.authenticateAdmin);
//route pour créer une commande d'un montant fixe
router.post("/", function (req, res) {
    let data = req.body;
    let UserId = req.user.id;
    Order.create({
        total_amount: data.total_amount,
        UserId: UserId,
    }).then((order) => {
        res.json(order);
        res.status(201);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});

router.patch("/:id", function (req, res) {
    let orderId = req.params.id;
    let data = req.body;
    Order.update({
        name: data.name,
        price: data.price,
        description: data.description,
    }, {
        where: {
            id: orderId
        }
    }).then((order) => {
        res.json(order);
        res.status(201);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
router.delete("/:id", function (req, res) {
    let orderId = req.params.id;
    Order.destroy({
        where: {
            id: orderId
        }
    }).then((order) => {
        res.json(order);
        res.status(201);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
module.exports = router;