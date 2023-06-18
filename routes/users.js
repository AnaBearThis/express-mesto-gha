const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateUserInfo, updateAvatar,
} = require('../controllers/users');

const ERROR_CODE_NOT_FOUND = 404;

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);
router.use('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
