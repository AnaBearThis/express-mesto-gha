const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};

module.exports = auth;
