const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards')

const ERROR_CODE_NOT_FOUND = 404;

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.use('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;