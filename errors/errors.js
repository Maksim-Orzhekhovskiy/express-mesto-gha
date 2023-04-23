const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const handleErrors = (err, res) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(400).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(404).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(400).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  return res.status(500).send({
    message: `На сервере произошла ошибка ${err.name}: ${err.message}`,
  });
};

module.exports = {
  handleErrors
}