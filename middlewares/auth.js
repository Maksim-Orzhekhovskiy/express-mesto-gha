const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorizedError");
const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    return next(new AuthorizationError("Необходима авторизация"));
  }
  let payload;
  try {
    payload = jwt.verify(
      jwtToken,
      NODE_ENV === "production" ? SECRET_KEY : "dev-secret-key"
    );
  } catch (err) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }
  req.user = payload;
  return next();
};
