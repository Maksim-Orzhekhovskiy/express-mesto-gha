const express = require("express");
const indexRouter = express.Router();

const signin = require("./signin");
const signup = require("./signup");
const users = require("./users");
const cards = require("./cards");

const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/notFoundError");

indexRouter.use("/signin", signin);
indexRouter.use("/signup", signup);
indexRouter.use("/users", auth, users);
indexRouter.use("/cards", auth, cards);
indexRouter.use("*", (req, res, next) => {
  next(new NotFoundError("Страницы не существует"))
})

// EXPORT ROUTES
module.exports = indexRouter;
