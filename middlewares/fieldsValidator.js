const boom = require('boom');

const fieldsValidator = (fields) => async (req, _res, next) => {
  const data = fields.map((field) => req.body[field]);

  const invalidFields = fields.filter((_field, i) => typeof data[i] !== 'string');

  return invalidFields.length > 0
    ? next(boom.badData('Dados inválidos', invalidFields.join(', ')))
    : next();
};

module.exports = fieldsValidator;
