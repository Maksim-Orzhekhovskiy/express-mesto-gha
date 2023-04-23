// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const mongoose = require("mongoose");
const allRoutes = require("./routes/index");


const { PORT = 3000 } = process.env;
const DATABASE_URL = "mongodb://localhost:27017/mestodb";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log("Error on database connection");
    console.error(err);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6443e584312c8ef2837c989b", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use("/", allRoutes);

app.patch("/404", (req, res) => {
  res.status(404).json({ message: "Ты ошибся парень /404" });
});

app.listen(PORT, () => {
  console.log(`Свервер стартанул на ${PORT}`);
});
