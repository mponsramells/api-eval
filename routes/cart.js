const express = require('express');
const router = express.Router();
const {Cart, Product, cart_product}  = require('../models/');
const userAuth = require("../middlewares/auth.js");

router.use(userAuth.authenticateUser);
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
    Cart.findByPk(req.params.id).then((cart) => {
        res.json(cart);
        res.status(200);
    }).catch((error) => {
        console.log(error);
        res.status(500);
    });
});
//route pour récupérer le panier d'un utilisateur
router.get("/user/", function (req, res) {
    try {
        async function findByUser() {
            console.log("UserID récupéré :", req.user.id)
            const UserId = req.user.id;
            const cart = await Cart.findAll({
                where: { UserId: UserId },
            });
            res.json(cart);
            res.status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});
router.post("/", function (req, res) {
    try {
        async function createCart() {
            const UserId = req.user.id;
            console.log("UserID récupéré :", UserId);

            const cart = await Cart.findOrCreate(
                {
                    where: { UserId: UserId },
                    defaults: { UserId: UserId },
                }
            );
            console.log("Panier créé :", cart);

            res.json(cart);
            res.status(201);
        }
        createCart();
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur interne du serveur");
    }
});
router.post("/addProduct", function (req, res) {
    let data = req.body;
    let UserId = req.user.id;
    let quantity = data.quantity;
    let ProductId = data.ProductId;
    Product.findByPk(ProductId).then((product) => {
        Cart.findOrCreate({
            where: { UserId: UserId },
            defaults: { UserId: UserId },
        }).then((cart) => {
            console.log(cart);
            cart[0].addProduct(product, { through: {
                quantity: quantity
                } } ).then((cartProduct) => {
                res.json(cartProduct);
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