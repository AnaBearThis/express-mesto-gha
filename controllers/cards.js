const Card = require('../models/card')

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

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
      if (err.name === "ValidationError") {
        const ValidationErr = new ValidationError("Переданы некорректные данные при создании карточки.")
        res.status(400).send({ message: ValidationErr.message})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => {
      if(!card) {
        res.status(404).send({ message: "Карточка с указанным _id не найдена." })
      } else {
        res.send({ data: card })
      }
      })
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}`}))
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
      if (err.name === "ValidationError") {
        const ValidationErr = new ValidationError("Переданы некорректные данные для постановки лайка.")
        res.status(400).send({ message: ValidationErr.message})
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
      if (err.name === "ValidationError") {
        const ValidationErr = new ValidationError("Переданы некорректные данные для снятия лайка.")
        res.status(400).send({ message: ValidationErr.message})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}