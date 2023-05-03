// eslint-disable-next-line import/no-unresolved
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      require: true,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      require: true,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      require: true,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (url) =>
          /^(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im.test(
            url
          ),
        message: "Неправильный формат ссылки на аватар",
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Неправильный формат почты",
      },
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials: function (email, password) {
        return this.findOne({ email })
          .select("+password")
          .then((user) => {
            if (!user) {
              return Promise.reject(new Error("Неправильные почта или пароль"));
            }
            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) {
                return Promise.reject(
                  new Error("Неправильные почта или пароль")
                );
              }
              return user;
            });
          });
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
