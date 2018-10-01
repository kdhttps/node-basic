const express = require('express');
const router = express.Router();
const todo = require('./todo/todo.route');
const auth = require('./auth/auth.route');
/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
  message: 'Cool'
}));

router.use('/login', auth);
router.use('/v1/todo', todo);

module.exports = router;
