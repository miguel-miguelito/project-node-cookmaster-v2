require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

const { PORT } = process.env;

const fields = {
  register: ['name', 'email', 'password'],
  login: ['email', 'password'],
  recipe: ['name', 'ingredients', 'preparation'],
};

const app = express();

app.use(bodyParser.json());

app.post(
  '/users',
  middlewares.fieldsValidator(fields.register),
  controllers.user.register,
);

app.post(
  '/login',
  middlewares.fieldsValidator(fields.login),
  controllers.user.login,
);

const recipeRouter = express.Router();

recipeRouter
  .post(
    '/',
    middlewares.auth,
    middlewares.fieldsValidator(fields.recipe),
    controllers.recipe.createNew,
  )
  .get(
    '/',
    controllers.recipe.showAll,
  )
  .get(
    '/:id',
    controllers.recipe.showOne,
  )
  .put(
    '/:id',
    middlewares.auth,
    middlewares.permissionsValidator,
    middlewares.fieldsValidator(fields.recipe),
    controllers.recipe.edit,
  )
  .delete(
    '/:id',
    middlewares.auth,
    middlewares.permissionsValidator,
    controllers.recipe.remove,
  );

recipeRouter.put(
  '/:id/image/',
  middlewares.auth,
  middlewares.permissionsValidator,
  middlewares.uploadWithMulter(),
  controllers.recipe.addImage,
);

app.use('/recipes', recipeRouter);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(middlewares.boomErrorHandler);

app.use(middlewares.otherErrorsHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
