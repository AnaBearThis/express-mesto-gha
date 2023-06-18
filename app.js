const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
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

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.use('/', router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
