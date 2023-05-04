const { ValidationError, DocumentNotFoundError, CastError } =
  require("mongoose").Error;

const UnauthorizedError = require("../errors/unauthorizedError");
const ForbiddenError = require("../errors/forbiddenError");
const NotFoundError = require("../errors/notFoundError");

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(" ");
    return res.status(400).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(404).send({
      message: "В базе данных не найден документ с таким ID",
    });
  }
  if (err instanceof CastError) {
    return res.status(400).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(409).send({
      message:
        "Указанный email уже зарегистрирован. Пожалуйста используйте другой",
    });
  }
  res.status(500).send({
    message: `На сервере произошла ошибка ${err.name}: ${err.message}`,
  });
  return next();
});
