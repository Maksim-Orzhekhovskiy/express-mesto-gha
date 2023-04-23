const express = require("express");

const indexRouter = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const errNotFound = require('./error');

indexRouter.use('/users', userRouter);
indexRouter.use('/cards', cardRouter);
indexRouter.use('/error', errNotFound);

module.exports = indexRouter;