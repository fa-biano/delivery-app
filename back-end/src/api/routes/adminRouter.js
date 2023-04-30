const adminRouter = require('express').Router();
const { adminController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

adminRouter.get('/manage', tokenValidation, adminController.getUsers);
adminRouter.post('/manage', tokenValidation, adminController.createUser);
adminRouter.delete('/manage', tokenValidation, adminController.removeUser);

module.exports = adminRouter;