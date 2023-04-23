const express = require("express");

const allRoutes = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
// const errorRouter = require('./error')

allRoutes.use("/users", userRouter);
allRoutes.use("/cards", cardRouter);
// allRoutes.use("*", errorRouter)
// allRoutes = (req, res) => {
//   res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
// });

module.exports = allRoutes;