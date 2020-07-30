const boom = require('boom');
const services = require('../services');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const {
    success,
    conflict,
    message,
    newUser,
  } = await services.user.register(name, email, password);

  if (conflict) return next(boom.conflict(message));

  if (!success) return next({ message });

  return res.status(201).json({ message, newUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const {
    success,
    unauthorized,
    message,
    token,
  } = await services.user.login(email, password);

  if (unauthorized) return next(boom.unauthorized(message));

  if (!success) return next({ message });

  return res.status(200).json({ message, token });
};

module.exports = {
  register,
  login,
};
