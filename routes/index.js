const express = require("express");

const allRoutes = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

allRoutes.use("/users", userRouter);
allRoutes.use("/cards", cardRouter);

allRoutes.use("*", (req, res) => {
    res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  });
