const httpStatus = require('http-status');
const message = 'Hello';

const handleCatch = (error, res) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);

module.exports = {
  message,
  handleCatch
};
