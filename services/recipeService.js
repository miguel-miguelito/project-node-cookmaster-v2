const models = require('../models');

const { PORT } = process.env;

const createNew = async (name, ingredients, preparation, authorId) => {
  try {
    const newRecipe = await models.recipe.create(name, ingredients, preparation, authorId);
    return {
      success: true,
      message: 'Receita criada com sucesso!',
      newRecipe,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const showAll = async () => {
  try {
    const recipes = await models.recipe.getAll();
    return {
      success: true,
      message: 'Receitas mostradas com sucesso!',
      recipes,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const showOne = async (id) => {
  try {
    const recipe = await models.recipe.getById(id);

    if (!recipe) {
      return {
        notFound: true,
        message: 'Receita não encontrada',
      };
    }

    return {
      success: true,
      message: 'Receita mostrada com sucesso!',
      recipe,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const edit = async (recipeId, name, ingredients, preparation) => {
  try {
    const updatedRecipe = await models.recipe.update(recipeId, name, ingredients, preparation);
    return {
      success: true,
      message: 'Receita atualizada com sucesso!',
      updatedRecipe,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const remove = async (recipeId) => {
  try {
    const recipe = await models.recipe.getById(recipeId);

    await models.recipe.remove(recipeId);

    return {
      success: true,
      message: 'Receita excluída com sucesso!',
      deletedRecipe: recipe,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const getAuthorId = async (recipeId) => {
  try {
    const recipe = await models.recipe.getById(recipeId);

    if (!recipe) {
      return {
        notFound: true,
        message: 'Receita não encontrada',
      };
    }

    return {
      success: true,
      authorId: recipe.authorId,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const addImage = async (recipeId) => {
  try {
    const imageUrl = `http://localhost:${PORT}/images/${recipeId}`;

    await models.recipe.addImageUrl(recipeId, imageUrl);

    return {
      success: true,
      message: 'Imagem adicionada com sucesso!',
      imageUrl,
    };
  } catch (err) {
    return { message: err.message };
  }
};

module.exports = {
  createNew,
  showAll,
  showOne,
  edit,
  remove,
  getAuthorId,
  addImage,
};
