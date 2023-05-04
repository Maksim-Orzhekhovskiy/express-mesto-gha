const express = require("express");
const signUpRouter = express.Router();
const { celebrate, Joi } = require("celebrate");
const { createUser } = require("../controllers/users");

signUpRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /^(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im
      ),
    }),
  }),
  createUser
);

module.exports = signUpRouter;
