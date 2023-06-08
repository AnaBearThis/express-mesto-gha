const { default: mongoose } = require('mongoose');
const User = require('../models/user')

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if(!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      } else {
        res.send({data: user})
      }})
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Переданы некорректные данные _id."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      console.log(mongoose.Error);
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные при создании пользователя."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then((user) => {
      if(!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      } else {
        res.send({ data: user })}
      })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;

  User.findByIdAndUpdate(req.user._id, avatar, {new: true, runValidators: true})
    .then(user => {
      if(!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      } else {
        res.send({ data: user })}
      })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара."})
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}`})
      }
    })
}