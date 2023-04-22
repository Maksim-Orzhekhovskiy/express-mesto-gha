const User = require("../model/users");
const { handleErrors } = require("../errors/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => handleErrors(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error("Данный пользователь не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    res.status(400).send({ message: "Не передано обязательное поле" });
    return;
  }
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const userUpdate = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    updateData,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new Error("Данный пользователь не найден");
    })
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

const updateUserInfo = (req, res) => {
  const updateData = req.body;
  userUpdate(req, res, updateData);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body; // Получаем новый url-адрес аватара из тела запроса
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new Error("Данный пользователь не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
