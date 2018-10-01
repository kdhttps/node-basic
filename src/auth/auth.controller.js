/**
 * Created by KD
 */
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const user = require('../user/user.helper');

function login(req, res) {
  user.getByUsernamePassword(req.body.username, req.body.password)
    .then(user => {
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).send({msg: 'Unauthorized'});
      }

      let token = jwt.sign({username: user.username}, process.env.APP_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
      return res.send({token: token});
    })
    .catch(error => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    });
};

module.exports = {
  login
};
