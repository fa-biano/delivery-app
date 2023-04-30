const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-manual.json');

const {
  loginRouter,
  registerRouter,
  customerRouter,
  sellerRouter,
  adminRouter,
} = require('./routes');

const { errorMiddleware } = require('./middlewares');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.static('public'));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer', customerRouter);
app.use('/seller', sellerRouter);
app.use('/admin', adminRouter);

app.use(errorMiddleware);

module.exports = app;
