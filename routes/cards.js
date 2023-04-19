const express = require('express');

const cardRouter = express.Router();

const { createCard, getCards, deleteCard } = require('../controllers/cards');

cardRouter.post('/cards', createCard);

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCard);
