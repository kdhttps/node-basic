const express = require('express');
const router = express.Router();
const todo = require('./todo/todo.route');
const auth = require('./auth/auth.route');
const blog = require('./blog/blog.route');

/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
  message: 'Cool'
}));

router.use('/login', auth);
router.use('/todo', todo);
router.use('/blog', blog);

module.exports = router;
