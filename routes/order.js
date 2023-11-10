const express = require('express');
const router = express.Router();
const { Order } = require('../models/order.js');

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
router.post("/", function (req, res) {
    let data = req.body;
    Order.create({
        name: data.name,
        price: data.price,
        description: data.description,
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