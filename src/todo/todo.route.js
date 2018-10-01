/**
 * Created by KD
 */
const express = require('express');
const router = express.Router();
const todoController = require('./todo.controller');

router.route('/')
  .get(todoController.get)
  .post(todoController.add);

router.route('/:id')
  .put(todoController.update)
  .delete(todoController.remove);

router.route('/search')
  .post(todoController.search);

module.exports = router;
