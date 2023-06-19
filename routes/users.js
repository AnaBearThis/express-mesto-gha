const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(http|https):\/\/(www\.)?[a-zA-Z\d-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
}), updateAvatar);

module.exports = router;
