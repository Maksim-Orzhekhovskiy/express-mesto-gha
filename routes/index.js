const express = require("express");

const indexRouter = express.Router();

indexRouter.use("*", (req, res) => {
    res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
  });