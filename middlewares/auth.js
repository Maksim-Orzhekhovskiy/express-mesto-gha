const jwt = require("jsonwebtoken");
const { NODE_ENV, SECRET_KEY } = process.env;
const UnauthorizedError = require("../errors/unauthorizedError");

module.exports = (req, res, next) => {
  const jwtoken = req.cookies.jwt;
  if (!jwtoken) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }
  let payload;
  try {
    payload = jwt.verify(
      jwtoken,
      NODE_ENV === "production" ? SECRET_KEY : "dev-secret-key"
    );
  } catch (err) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }
  req.user = payload;
  return next();
};

