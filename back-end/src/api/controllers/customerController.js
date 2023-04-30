const { productService, orderService, userService } = require('../services');

const getProducts = async (_req, res) => {
  const products = await productService.getProducts();
  return res.status(200).json(products);
};

const getSellers = async (_req, res) => {
  const sellers = await userService.getSellers();
  return res.status(200).json(sellers);
};

const createOrder = async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);
  return res.status(201).json(order);
};

const getOrders = async (req, res) => {
  const { id } = req.params;
  
  if (id) {
    const order = await orderService.getOrdersById(id);
    return res.status(200).json(order);
  }

  const orders = await orderService.getUserOrders(req.user.id);
  return res.status(200).json(orders);
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const update = await orderService.updateOrderStatus(id, status, req.user);
  return res.status(200).json(update);
};

module.exports = {
  getProducts,
  createOrder,
  getSellers,
  getOrders,
  updateOrderStatus,
};