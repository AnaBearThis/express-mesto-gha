const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

const ERROR_CODE_NOT_FOUND = 404;

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);
router.use('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
