const { userService } = require('../services');

const getUsers = async (req, res) => {
  const users = await userService.getUsers(req.user.id);
  return res.status(200).json(users);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  return res.status(201).json(newUser);
};

const removeUser = async (req, res) => {
  await userService.removeUser(req.body.userId, req.user.role);
  return res.status(204).end();
};

module.exports = {
  getUsers,
  createUser,
  removeUser,
};