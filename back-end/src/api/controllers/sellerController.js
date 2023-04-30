const { orderService } = require('../services');

const getOrders = async (req, res) => {
  const { id } = req.params;
  
  if (id) {
    const order = await orderService.getOrdersById(id);
    return res.status(200).json(order);
  }

  const orders = await orderService.getSellerOrders(req.user.id);
  return res.status(200).json(orders);
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const update = await orderService.updateOrderStatus(id, status, req.user);
  return res.status(200).json(update);
};

module.exports = {
  getOrders,
  updateOrderStatus,
};