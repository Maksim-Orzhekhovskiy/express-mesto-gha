const UnauthorizedError = require("../errors/unauthorizedError");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError("Необходима авторизация3"));
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
   "dev-secret-key"
    );
  } catch (err) {
    return next(new UnauthorizedError("Необходима авторизация4"));
  }
  req.user = payload;
  return next();
};

