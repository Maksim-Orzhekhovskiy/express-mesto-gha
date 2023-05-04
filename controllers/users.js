const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require("../errors/unauthorizedError");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  const requiredData = req.params.userId;
  getUserById(req, res, requiredData, next);
};

const createUser = (req, res, next) => {
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
    .catch(next)
};

const userUpdate = (req, res, updateUser, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateUser, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const updateUser = req.body;
  userUpdate(req, res, updateUser, next);
};

const getUserInfo = (req, res, next) => {
  const requiredData = req.user._id;
  getUserById(req, res, requiredData, next);
};

const updateUserAvatar = (req, res, next) => {
  const updateUser = req.body;
  userUpdate(req, res, updateUser, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Необходима авторизация");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Необходима авторизация");
        }
        const jwtoken = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        res.cookie("jwt", jwtoken, { maxAge: 3600000 * 24 * 7, httpOnly: true });
        res.status(200).send({ message: "Аутентификация прошла успешно" });
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
