const express = require("express");
const signInRouter = express.Router();
const { celebrate, Joi } = require("celebrate");
const { login } = require("../controllers/users");

signInRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

module.exports = signInRouter;
