/**
 * Created by KD
 */
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.route('/')
  .post(authController.login);

module.exports = router;
