const User = require('../model/users');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(400).send({ message: 'Невалидный id' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const userUpdate = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const updateUserInfo = (req, res) => {
  const updateData = req.body;
  userUpdate(req, res, updateData);
};

const updateUserAvatar = (req, res) => {
  const updateData = req.body;
  userUpdate(req, res, updateData);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
