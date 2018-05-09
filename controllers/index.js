const express = require('express'),
  router = express.Router();

/**
 * Default route.
 */
router.get('/health-check', (req, res) => res.status(200).send({
  message: 'Cool'
}));

router.use('/api/', require('./todo'));
router.use('/', require('./login'));

module.exports = router;
