const validateStatusChange = (role, newStatus) => {
  const statusAllowed = {
    seller: ['Preparando', 'Em Trânsito'],
    customer: ['Entregue'],
  };

  const isValidStatus = statusAllowed[role].some((status) => status === newStatus);

  if (!isValidStatus) {
    const error = new Error('Status change not allowed');
    error.name = 'BadRequest';
    throw error;
  }
};

module.exports = validateStatusChange;