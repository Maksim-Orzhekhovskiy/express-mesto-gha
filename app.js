// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const login = require("./routes/users");
const createUser = require("./routes/users");
const auth = require("./middlewares/auth");

const { PORT = 3000 } = process.env;
const DATABASE_URL = "mongodb://localhost:27017/mestodb";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => {
    console.log(`Присоеденился к базе ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log("Error on database connection");
    console.error(err);
  });

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.patch("/404", (req, res) => {
  res.status(404).json({ message: "Ты ошибся парень /404" });
});

app.listen(PORT, () => {
  console.log(`Свервер стартанул на ${PORT}`);
});
