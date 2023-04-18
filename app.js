// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const rootRouter = require('./routes/users');

const PORT = 3000;
const DATABASE_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use('/', rootRouter);

app.listen(PORT, () => {
  console.log(`Свервер стартанул на ${PORT}`);
});
