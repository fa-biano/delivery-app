const registerRouter = require('express').Router();
const { loginController } = require('../controllers');

registerRouter.post('/', loginController.createUser);

module.exports = registerRouter;