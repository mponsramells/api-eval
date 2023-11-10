const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');

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

router.post('/', function(req, res){
    let data = req.body;
    Product.create({
        title: data.title,
        price: data.price,
        description: data.description,
        stock: data.stock,
    }).then(product => {
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
        name: data.name,
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