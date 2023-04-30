const loginRouter = require('express').Router();
const { loginController } = require('../controllers');

loginRouter.post('/', loginController.getLogin);

module.exports = loginRouter;