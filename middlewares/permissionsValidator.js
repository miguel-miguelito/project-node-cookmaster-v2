const boom = require('boom');
const services = require('../services');

const permissionsValidator = async (req, _res, next) => {
  const { id } = req.params;
  const { success, notFound, message, authorId } = await services.recipe.getAuthorId(Number(id));

  if (notFound) return next(boom.notFound(message));

  if (!success) return next({ message });

  const { id: userId, role } = req.user;

  return authorId !== userId && role !== 'admin'
    ? next(boom.forbidden('Você não tem permissão para realizar essa operação'))
    : next();
};

module.exports = permissionsValidator;
