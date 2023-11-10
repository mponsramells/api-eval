const express = require('express');
const router = express.Router();
const { Cart } = require('../models/cart.js');

router.get("/", function (req, res) {
    Cart.findAll().then((carts) => {
        res.json(carts);
        res.status(200);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
router.get("/:id", function (req, res) {
    let cartId = req.params.id;
    Cart.findByPk(cartId).then((cart) => {
        res.json(cart);
        res.status(200);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
router.get("/:user_id", function (req, res) {

});
router.post("/", function (req, res) {
    let data = req.body;
    Cart.create({

    }).then((cart) => {
        res.json(cart);
        res.status(201);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
router.patch("/:id", function (req, res) {
    let cartId = req.params.id;
    let data = req.body;
    Cart.update({
        name: data.name,
        price: data.price,
        description: data.description,
    }, {
        where: {
            id: cartId
        }
    }).then((cart) => {
        res.json(cart);
        res.status(201);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
router.delete("/:id", function (req, res) {
    let cartId = req.params.id;
    Cart.destroy({
        where: {
            id: cartId
        }
    }).then((cart) => {
        res.json(cart);
        res.status(201);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
module.exports = router;