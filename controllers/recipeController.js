const boom = require('boom');
const services = require('../services');

const createNew = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id: authorId } = req.user;

  const {
    success,
    message,
    newRecipe,
  } = await services.recipe.createNew(name, ingredients, preparation, authorId);

  if (!success) return next({ message });

  return res.status(201).json({ message, newRecipe });
};

const showAll = async (_req, res, next) => {
  const { success, message, recipes } = await services.recipe.showAll();

  if (!success) return next({ message });

  return res.status(200).json({ message, recipes });
};

const showOne = async (req, res, next) => {
  const { id } = req.params;

  const { success, notFound, message, recipe } = await services.recipe.showOne(Number(id));

  if (notFound) return next(boom.notFound(message));

  if (!success) return next({ message });

  return res.status(200).json({ message, recipe });
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const {
    success,
    message,
    updatedRecipe,
  } = await services.recipe.edit(Number(id), name, ingredients, preparation);

  if (!success) return next({ message });

  return res.status(200).json({ message, updatedRecipe });
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  const {
    success,
    message,
    deletedRecipe,
  } = await services.recipe.remove(Number(id));

  if (!success) return next({ message });

  return res.status(200).json({ message, deletedRecipe });
};

const addImage = async (req, res, next) => {
  if (!req.file || req.file.fieldname !== 'image') {
    return next(boom.badData('Dados inválidos', 'image'));
  }

  const { id: recipeId } = req.params;

  const { success, message, imageUrl } = await services.recipe.addImage(recipeId);

  if (!success) return next({ message });

  return res.status(200).json({ message, imageUrl });
};

module.exports = {
  createNew,
  showAll,
  showOne,
  edit,
  remove,
  addImage,
};
