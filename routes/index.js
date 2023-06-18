const router = require('express').Router();
const auth = require('../middlewares/auth');

const ERROR_CODE_NOT_FOUND = 404;

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;
