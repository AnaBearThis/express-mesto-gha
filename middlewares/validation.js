const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');

const regEx = /^(http|https):\/\/[a-zA-Z0-9-_]+\.[a-zA-Z\d.-]{2,}(\/.*)?$/;

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regEx),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
