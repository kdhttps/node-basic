/**
 * Created by KD
 */
const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');

router.route('/')
  .get(blogController.get)
  .post(blogController.add);

router.route('/:id')
  .put(blogController.update)
  .delete(blogController.remove);

router.route('/search')
  .post(blogController.search);

module.exports = router;
