const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const validateSign = require('./middlewares/validation');
const errorHandler = require('./middlewares/error');

const { PORT = 3000 } = process.env;
const BASE_URL = 'mongodb://0.0.0.0:27017/mestodb';

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log(`Something went wrong ${err}`);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(validateSign);
app.use('/', router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
