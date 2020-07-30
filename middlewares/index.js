const auth = require('./auth');
const boomErrorHandler = require('./boomErrorHandler');
const otherErrorsHandler = require('./otherErrorsHandler');
const fieldsValidator = require('./fieldsValidator');
const permissionsValidator = require('./permissionsValidator');
const uploadWithMulter = require('./uploadWithMulter');

module.exports = {
  auth,
  boomErrorHandler,
  otherErrorsHandler,
  fieldsValidator,
  permissionsValidator,
  uploadWithMulter,
};
