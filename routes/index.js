const express = require("express");

const allRoutes = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const errorRouter = require('./error')

allRoutes.use("/users", userRouter);
allRoutes.use("/cards", cardRouter);
allRoutes.use("*", errorRouter)

module.exports = allRoutes;