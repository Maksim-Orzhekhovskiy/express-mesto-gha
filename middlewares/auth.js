const jwt = require("jsonwebtoken");
const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(
      jwtToken,
      NODE_ENV === "production" ? SECRET_KEY : "dev-secret-key"
    );
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};

