const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const secretPath = path.resolve(__dirname, '../../../jwt.evaluation.key');
  
const newtoken = async (payload) => {
  const SECRET = await fs.readFile(secretPath, 'utf8'); 
  const token = jwt.sign(payload, SECRET);
  return token;
};

module.exports = { newtoken };