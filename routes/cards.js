const express = require("express");

const cardRouter = express.Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardRouter.get("/cards", getAllCards);

cardRouter.post("/cards", createCard);

cardRouter.delete("/cards/:cardId", deleteCard);

cardRouter.put("/:cardId/likes", likeCard);

cardRouter.delete("/:cardId/likes", dislikeCard);

module.exports = cardRouter;
