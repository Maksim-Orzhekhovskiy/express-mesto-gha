// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const PORT = 3000;
const DATABASE_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '643ec26fba83e927b24652c6', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use(userRouter);
app.use(cardRouter);

app.patch('/404', (req, res) => {
  res.status(404).json({ message: 'Ты ошибся парень /404' });
});

app.listen(PORT, () => {
  console.log(`Свервер стартанул на ${PORT}`);
});
