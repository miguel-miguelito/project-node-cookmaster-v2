const jwt = require('jsonwebtoken');
const models = require('../models');

const { JWT_SECRET } = process.env;

const register = async (name, email, password) => {
  try {
    const isNotUnique = await models.user.findByEmail(email);

    if (isNotUnique) {
      return {
        conflict: true,
        message: 'Email já está cadastrado',
      };
    }

    const newUser = await models.user.create(name, email, password);

    return {
      success: true,
      message: 'Novo usuário cadastrado com sucesso!',
      newUser,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const login = async (email, password) => {
  try {
    const user = await models.user.findByEmail(email);

    if (!user || user.password !== password) {
      return {
        unauthorized: true,
        message: 'Verifique seu email e senha',
      };
    }

    const { password: _, id, ...userData } = user;

    const jwtConfig = {
      expiresIn: '50m',
      algorithm: 'HS256',
      subject: String(id),
    };

    const token = jwt.sign(userData, JWT_SECRET, jwtConfig);

    return {
      success: true,
      message: 'Login feito com sucesso!',
      token,
    };
  } catch (err) {
    return { message: err.message };
  }
};

module.exports = {
  register,
  login,
};
