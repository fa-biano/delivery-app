const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const secretPath = path.resolve(__dirname, '../../../jwt.evaluation.key');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ status: 401, message: 'Token not found' });

  try {
    const SECRET = await fs.readFile(secretPath, 'utf8');
    const payload = jwt.verify(token, SECRET);
    req.user = { ...payload };
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ status: 401, message: 'Expired or invalid token' });
  }
};