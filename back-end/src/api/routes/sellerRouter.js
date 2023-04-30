const sellerRouter = require('express').Router();
const { sellerController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

sellerRouter.get('/orders', tokenValidation, sellerController.getOrders);
sellerRouter.get('/orders/:id', tokenValidation, sellerController.getOrders);
sellerRouter.put('/orders/:id', tokenValidation, sellerController.updateOrderStatus);

module.exports = sellerRouter;