const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;

  const errorHandler = {
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    Conflict: 409,
    UnprocessableEntity: 422,
  };

  const statusCode = errorHandler[name];
  if (statusCode) return res.status(statusCode).json({ status: statusCode, message });
  console.log(err);
  return res.status(500).end();
};

module.exports = errorMiddleware;