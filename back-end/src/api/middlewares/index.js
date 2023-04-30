const errorMiddleware = require('./errorMiddleware');
const tokenValidation = require('./auth');

module.exports = {
  errorMiddleware,
  tokenValidation,
};