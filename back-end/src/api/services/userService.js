const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const validateUser = require('../utils/validateUser');

const getLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  const hashedPassword = md5(password);
  if (!user || hashedPassword !== user.password) {
    const error = new Error('Email or password invalid');
    error.name = 'NotFound';
    throw error;
  }

  const { id, name, role } = user;
  return { id, name, email, role };
};

const createUser = async (newUser) => {
  const { name, email, password, role } = newUser;
  validateUser(name, email, password, role);

  const hashedPassword = md5(password);

  const [user, created] = await User.findOrCreate({
    where: { [Op.or]: [{ email }, { name }] },
    defaults: { name, email, password: hashedPassword, role },
  });

  if (!created) {
    const error = new Error('Email or Name already registered');
    error.name = 'Conflict';
    throw error;
  }

  return { id: user.id, name, email, role };
};

const getSellers = async () => {
  const sellers = await User.findAll({ 
    where: { role: 'seller' },
    attributes: { exclude: ['password'] },
  });

  return sellers;
};

const getUsers = async (adminId) => {
  const users = await User.findAll({
    where: { id: { [Op.ne]: adminId } },
    attributes: { exclude: ['password'] },
  });

  return users;
};

const removeUser = async (userId, role) => {
  if (role !== 'administrator') {
    const error = new Error('Unauthorized user');
    error.name = 'Unauthorized';
    throw error;
  }

  await User.destroy({ where: { id: userId } });
  return 'user deleted';
};

module.exports = {
  getLogin,
  createUser,
  getSellers,
  getUsers,
  removeUser,
};