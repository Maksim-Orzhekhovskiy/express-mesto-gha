const User = require("../model/users");
const { handleErrors } = require("../errors/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(201).send(data);
    })
    .catch(next);

  // if (!name) {
  //   return res.status(400).send({ message: 'Поле Имя обязательно для заполнения' });
  // }

  // if (!about) {
  //   return res.status(400).send({ message: 'Поле О себе обязательно для заполнения' });
  // }

  // if (!avatar) {
  //   return res.status(400).send({ message: 'Поле Аватар обязательно для заполнения' });
  // }
};

const userUpdate = (req, res, updateUser) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateUser, { new: true, runValidators: true })
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

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        res.cookie("jwt", token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
        res.status(200).send({ message: "Аутентификация прошла успешно" });
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
