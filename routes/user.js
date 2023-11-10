const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {log} = require("debug");

function generateToken(id) {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

router.post('/signup', function (req, res, next) {
    let data = req.body;
    log(data);
    try {
        if (data.password.length > 8) {
            bcrypt.hash(data.password, 12).then(hash => {
                data.password = hash;
                try {
                    const user = async () => {
                        await User.create({
                            email: data.email,
                            password: data.password,
                            display_name: data.display_name
                        });
                    }
                    res.status(201);
                    res.json('post');
                    return user();
                } catch (error) {
                    res.status(error.status);
                }
            });
        } else {
            res.send('Invalid password length');
            res.status(500);
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});
router.post('/login', function (req, res, next) {
    let data = req.body;
    try {
        const user = async () => {
            await User.findOne({where: {email: data.email}}).then(user => {
                if (user) {
                    bcrypt.compare(data.password, user.password).then(isOk => {
                        if (!isOk) {
                            res.status(400);
                            res.send('Invalid credentials');
                        } else {
                            delete user.password;
                            // GENERATE JWT Token
                            res.status(200);
                            let userToken = generateToken(user.id);
                            res.setHeader('Authorization', 'bearer ' + userToken);
                            return res.json({
                                "userToken": userToken,
                                "user": user
                            })
                        }
                    })
                }
            });
        }
        return user();
    } catch (error) {
        res.status(500);
    }
});

router.get('/', function (req, res, next) {
    try {
        const user = async () => {
            await User.findAll().then(user => {
                res.json(user);
                res.status(200);
            });
        }
        return user();
    } catch (error) {
        res.status(500);
    }
});
router.get('/token', function (req, res, next) {
    const headers = req.headers;
    if (headers.authorization) {
        const token = headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.status(401);
                res.send('Invalid token');
            } else {
                res.status(200);
                res.send(decoded);
            }
        });
    } else {
        res.status(401);
        res.send('No token');
    }
});
module.exports = router;