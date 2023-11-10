const express = require('express');
const router = express.Router();
const {Product, Tags}  = require('../models/');
const userAuth = require("../middlewares/auth.js");

router.use(userAuth.authenticateUser);
router.get('/', function(req, res){
    Product.findAll().then(products => {
        res.json(products);
        res.status(200);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});

router.get('/:id', function(req, res){
    let productId = req.params.id;
    Product.findByPk(productId).then(product => {
        res.json(product);
        res.status(200);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});
router.use(userAuth.authenticateAdmin);
router.post('/', function(req, res){
    let data = req.body;
    Product.create({
        title: data.title,
        price: data.price,
        description: data.description,
        stock: data.stock,
    }).then(product => {
        Tags.findByPk(data.tags).then(tags => {
            product.addTags(tags['dataValues']['id'])
        });
        res.json(product);
        res.status(201);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});
router.post('/:id/addTags', function(req, res){
    let productId = req.params.id;
    let data = req.body;
    Product.findByPk(productId).then(product => {
        Tags.findByPk(data.tags).then(tags => {
            product.addTags(tags['dataValues']['id'])
        });
        res.json(product);
        res.status(201);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});
router.post('/:id/removeTags', function(req, res){
    let productId = req.params.id;
    let data = req.body;
    Product.findByPk(productId).then(product => {
        Tags.findByPk(data.tags).then(tags => {
            product.removeTags(tags['dataValues']['id'])
        });
        res.json(product);
        res.status(201);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});
router.patch('/:id', function(req, res){
    let productId = req.params.id;
    let data = req.body;
    Product.update({
        title: data.title,
        price: data.price,
        description: data.description,
    }, {
        where: {
            id: productId
        }
    }).then(product => {
        res.json(product);
        res.status(201);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});

router.delete('/:id', function(req, res){
    let productId = req.params.id;
    Product.destroy({
        where: {
            id: productId
        }
    }).then(product => {
        res.json(product);
        res.status(201);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});

module.exports = router;