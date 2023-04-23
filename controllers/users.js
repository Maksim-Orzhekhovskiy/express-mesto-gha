const User = require("../model/users");
const { handleErrors } = require("../errors/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const userUpdate = (req, res, updateUser) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    updateUser,
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

const updateUserInfo = (req, res) => {
  const updateUser = req.body;
  userUpdate(req, res, updateUser);
};

const updateUserAvatar = (req, res) => {
  const updateUser = req.body;
  userUpdate(req, res, updateUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
}