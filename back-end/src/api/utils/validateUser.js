const validateEmail = (email) => {
  const validEmailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
  const isValidEmail = validEmailRegex.test(email);

  if (!isValidEmail) {
    const error = new Error('Invalid email format');
    error.name = 'BadRequest';
    throw error;
  }
};

const validateName = (name) => {
  if (name.length < 12) {
    const error = new Error('Name must have at least 12 characters');
    error.name = 'BadRequest';
    throw error;
  }
};

const validatePassword = (password) => {
  if (password.length < 6) {
    const error = new Error('Password must have at least 6 characters');
    error.name = 'BadRequest';
    throw error;
  }
};

const validateRole = (role) => {
   const allowedRoles = ['customer', 'seller', 'administrator'];
   const isValidRole = allowedRoles.some((allowedRole) => allowedRole === role);

   if (!isValidRole) {
    const error = new Error('Invalid user role');
    error.name = 'BadRequest';
    throw error;
   }
};

const validateUser = (name, email, password, role) => {
  if (!name || !email || !password) {
    const error = new Error('All fields must be filled');
    error.name = 'BadRequest';
    throw error;
  }
  validateEmail(email);
  validateName(name);
  validatePassword(password);
  validateRole(role);
};

module.exports = validateUser;