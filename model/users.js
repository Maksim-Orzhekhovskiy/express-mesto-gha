// eslint-disable-next-line import/no-unresolved
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      // default: 'Максямба',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      // default: 'Пузямба',
    },
    avatar: {
      type: String,
      require: true,
      // default: 'https://avatars.mds.yandex.net/i?id=b3c493fe3b3807e5d45133d79886c64d3876ac1b-9266169-images-thumbs&n=13',
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
