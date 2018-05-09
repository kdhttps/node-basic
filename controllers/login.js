const jwt = require('jsonwebtoken');
const express = require('express');
const httpStatus = require('http-status');
const router = express.Router();

const user = require('../helpers/user');

router.post('/login', (req, res) => {
    user.checkLogin(req.body.username, req.body.password)
        .then(user => {
            if (!!user) {
                let token = jwt.sign({username: user.username}, process.env.APP_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                return res.send({token: token});
            }

            return res.status(httpStatus.UNAUTHORIZED).send({msg: 'Fail'});
        })
        .catch(error => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
        });
});

module.exports = router;