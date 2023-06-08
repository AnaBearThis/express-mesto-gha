const { default: mongoose } = require('mongoose');
const Card = require('../models/card')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}`}))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные при создании карточки."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.deleteCard = (req, res) => {
  console.log(req.params);
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if(!card) {
        res.status(404).send({ message: "Карточка с указанным _id не найдена." })
      } else {
        res.send({ data: card })
      }
      })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Переданы некорректные данные _id."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => {
      if(!card) {
        res.status(404).send({ message: "Карточка с указанным _id не найдена." })
      } else {
        res.send({ data: card })
      }
      })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Переданы некорректные данные для постановки лайка."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => {
      if(!card) {
        res.status(404).send({ message: "Карточка с указанным _id не найдена." })
      } else {
        res.send({ data: card })
      }
      })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Переданы некорректные данные для снятия лайка."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}