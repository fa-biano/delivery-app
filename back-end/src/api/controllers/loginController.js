const { userService } = require('../services');
const { newtoken } = require('../utils/tokenGenerate');

const getLogin = async (req, res) => {
  const user = await userService.getLogin(req.body);
  
  const { id, name, email, role } = user;
  const payload = { id, name, email, role };
  const token = await newtoken(payload);
  
  return res.status(200).json({ status: 200, user, token });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'customer';
  const register = { name, email, password, role };

  const newUser = await userService.createUser(register);

  const payload = { id: newUser.id, name, email, role };
  const token = await newtoken(payload);

  return res.status(201).json({ status: 201, user: newUser, token });
};

module.exports = {
  getLogin,
  createUser,
};