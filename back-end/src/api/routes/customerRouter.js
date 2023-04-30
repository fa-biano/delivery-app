const customerRouter = require('express').Router();
const { customerController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

customerRouter.get('/products', tokenValidation, customerController.getProducts);
customerRouter.get('/checkout', tokenValidation, customerController.getSellers);
customerRouter.post('/checkout', tokenValidation, customerController.createOrder);
customerRouter.get('/orders', tokenValidation, customerController.getOrders);
customerRouter.get('/orders/:id', tokenValidation, customerController.getOrders);
customerRouter.put('/orders/:id', tokenValidation, customerController.updateOrderStatus);

module.exports = customerRouter;