const Sequelize = require('sequelize');
const config = require('../../database/config/config');
const { Sale, SaleProduct, User, Product } = require('../../database/models');
const validateStatusChange = require('../utils/validateStatusChange');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createOrder = async (userId, inputOrder) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = inputOrder;
  const setOrder = { sellerId, totalPrice, deliveryAddress, deliveryNumber };
  const newOrder = { userId, ...setOrder, saleDate: new Date(), status: 'Pendente' };

  const transaction = await sequelize.transaction();

  try {
    const order = await Sale.create({ ...newOrder }, { transaction });
    
    await products.forEach(async (prod) => {
      await SaleProduct.create(
        { saleId: order.id, productId: prod.productId, quantity: prod.quantity },
      );
    }, { transaction });

    await transaction.commit();
    return { orderId: order.id };
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    throw err;
  }
};

const getUserOrders = async (userId) => {
  const orders = await Sale.findAll(
    { where: { userId },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['id', 'password', 'role'] } },
        { model: User, as: 'seller', attributes: { exclude: ['id', 'password', 'role'] } },
        { model: SaleProduct, as: 'salesProducts' },
        { model: Product, as: 'products', through: { attributes: [] } },
    ] },
  );

  // codigo abaixo estruta mellhor o objeto de retorno. (Refeita associação na Model SaleProduct)
  // const orders = await Sale.findAll({
  //   where: { userId },
  //   include: [
  //     { model: User, as: 'user', attributes: { exclude: ['password', 'role'] } },
  //     { model: User, as: 'seller', attributes: { exclude: ['password', 'role'] } },
  //     { model: Product, as: 'products' },
  //   ],
  // });
  
  return orders;
};

const getOrdersById = async (id) => {
  const order = await Sale.findAll(
    { where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['id', 'password', 'role'] } },
        { model: User, as: 'seller', attributes: { exclude: ['id', 'password', 'role'] } },
        { model: SaleProduct, as: 'salesProducts' },
        { model: Product, as: 'products', through: { attributes: [] } },
    ] },
  );

  // codigo abaixo estruta mellhor o objeto de retorno. (Refeita associação na Model SaleProduct)
  // const order = await Sale.findAll({
  //   where: { id },
  //   include: [
  //     { model: User, as: 'user', attributes: { exclude: ['password', 'role'] } },
  //     { model: User, as: 'seller', attributes: { exclude: ['password', 'role'] } },
  //     { model: Product, as: 'products' },
  //   ],
  // });
  
  return order;
};

const getSellerOrders = async (sellerId) => {
  const order = await Sale.findAll(
    { where: { sellerId },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['id', 'password', 'role'] } },
        { model: User, as: 'seller', attributes: { exclude: ['id', 'password', 'role'] } },
        { model: SaleProduct, as: 'salesProducts' },
        { model: Product, as: 'products', through: { attributes: [] } },
    ] },
  );

  // codigo abaixo estruta mellhor o objeto de retorno. (Refeita associação na Model SaleProduct)
  // const order = await Sale.findAll({
  //   where: { sellerId },
  //   include: [
  //     { model: User, as: 'user', attributes: { exclude: ['password', 'role'] } },
  //     { model: User, as: 'seller', attributes: { exclude: ['password', 'role'] } },
  //     { model: Product, as: 'products' },
  //   ],
  // });
  
  return order;
};

const updateOrderStatus = async (id, status, user) => {
  validateStatusChange(user.role, status);
  await Sale.update({ status }, { where: { id } });
  const updated = await Sale.findByPk(id);
  return updated;
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrdersById,
  getSellerOrders,
  updateOrderStatus,
};