const jwt = require('jsonwebtoken');
const boom = require('boom');

const { JWT_SECRET } = process.env;

const auth = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(boom.unauthorized('Um token é necessário'));

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { sub, name, email, role } = payload;

    const user = {
      id: Number(sub),
      name,
      email,
      role,
    };

    req.user = user;
    return next();
  } catch (err) {
    next(boom.unauthorized(err.message));
  }
};

module.exports = auth;
