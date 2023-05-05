const express = require("express");
const cardRouter = express.Router();
const { celebrate, Joi } = require("celebrate");

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.get("/", getAllCards);

cardRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(
          /^(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im
        ),
    }),
  }),
  createCard
);

cardRouter.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard
);

cardRouter.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard
);

cardRouter.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislikeCard
);

module.exports = cardRouter;
