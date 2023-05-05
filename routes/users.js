const express = require("express");
const userRouter = express.Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  getUser,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/me", getUserInfo);

userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo
);

userRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .regex(
          /^(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im
        ),
    }),
  }),
  updateUserAvatar
);

userRouter.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUser
);

module.exports = userRouter;
