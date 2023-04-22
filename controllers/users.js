const User = require("../model/users");
const { handleErrors } = require("../errors/errors")


const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => handleErrors(err, res));
}

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    res.status(400).send({ message: "Не передано обязательное поле" });
  }
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => handleErrors(err, res));
};

const userUpdate = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const updateData = {};
  if (name) {
    updateData.name = name;
  }
  if (about) {
    updateData.about = about;
  }
  userUpdate(req, res, updateData);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const updateData = {};
  if (avatar) {
    updateData.avatar = avatar;
  }
  userUpdate(req, res, updateData);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
