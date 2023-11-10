const express = require('express');
const router = express.Router();
const Tags  = require('../models/tags.js');

router.get('/', function(req, res){
    Tags.findAll().then(tags => {
        res.json(tags);
        res.status(200);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});
router.get('/:id', function(req, res){
    let tagsId = req.params.id;
    Tags.findByPk(tagsId).then(tags => {
        res.json(tags);
        res.status(200);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});
router.post('/', function(req, res){
    let data = req.body;
    Tags.create({
        name: data.name,
    }).then(tags => {
        res.json(tags);
        res.status(201);
    }).catch(error => {
        res.json(error);
        res.status(500);
    });
});

router.patch('/:id', function(req, res){
    let tagsId = req.params.id;
    let data = req.body;
    Tags.update({
        name: data.name,
    }, {
        where: {
            id: tagsId
        }
    }).then(tags => {
        res.json('edited');
        res.status(201);
    }).catch(error => {
        res.json(error);
        res.status(500);
    });
});

router.delete('/:id', function(req, res){
    let tagsId = req.params.id;
    Tags.destroy({
        where: {
            id: tagsId
        }
    }).then(tags => {
        res.json(tags);
        res.status(201);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
});

module.exports = router;