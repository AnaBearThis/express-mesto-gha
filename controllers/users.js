const User = require('../models/user')

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      }
      res.send({ data: user })})
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}`}))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === "ValidationError") {
        const ValidationErr = new ValidationError("Переданы некорректные данные при создании пользователя.")
        res.send(ValidationErr.message)
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {name, about})
    .then(user => {
      if(!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      }
      res.send({ data: user })})
    .catch(err => {
      if (err.name === "ValidationError") {
        const ValidationErr = new ValidationError("Переданы некорректные данные при обновлении профиля.")
        res.send(ValidationErr.message)
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;

  User.findByIdAndUpdate(req.user._id, avatar)
    .then(user => {
      if(!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      }
      res.send({ data: user })})
    .catch(err => {
      if (err.name === "ValidationError") {
        const ValidationErr = new ValidationError("Переданы некорректные данные при обновлении аватара.")
        res.send(ValidationErr.message)
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}