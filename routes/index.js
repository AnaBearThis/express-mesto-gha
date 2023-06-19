const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res, next) => {
  next(new Error('Запрашиваемая страница не найдена'));
});

module.exports = router;
