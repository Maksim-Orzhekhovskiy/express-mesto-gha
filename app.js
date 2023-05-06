const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");

const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const validationErrors = require("celebrate").errors;
const errors = require("./middlewares/errors");

const { PORT = 3000 } = process.env;
const DATABASE_URL = "mongodb://localhost:27017/mestob1";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestob1")
  .then(() => {
    console.log(`Присоеденился к базе ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log("Error on database connection");
    console.error(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(helmet());


app.use("/", indexRouter);


app.use(validationErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log(`Свервер стартанул на ${PORT}`);
});
