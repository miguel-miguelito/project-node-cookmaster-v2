const connection = require('./connection');

const getAll = async () => (
  connection()
    .then((session) =>
      session
        .sql(`
          SELECT
            R.id,
            R.name,
            R.ingredients,
            R.preparation,
            R.image_url,
            R.author_id,
            U.name
          FROM cookmaster.recipes AS R
          INNER JOIN cookmaster.users AS U
          ON R.author_id = U.id;
        `)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, name, ingredients, preparation, imageUrl, authorId, authorName]) => ({
        id,
        name,
        ingredients,
        preparation,
        imageUrl,
        authorId,
        authorName,
      })),
    )
);

const getById = async (id) => {
  const allRecipes = await getAll();

  return allRecipes
    .find((recipe) => recipe.id === id);
};

const create = async (name, ingredients, preparation, authorId) => (
  connection()
    .then((session) =>
      session
        .getSchema('cookmaster')
        .getTable('recipes')
        .insert(['name', 'ingredients', 'preparation', 'author_id'])
        .values(name, ingredients, preparation, authorId)
        .execute(),
    )
    .then(({ getAutoIncrementValue }) => ({
      id: getAutoIncrementValue(),
      name,
      ingredients,
      preparation,
    }))
);

const update = async (id, name, ingredients, preparation) => (
  connection()
    .then((session) =>
      session
        .getSchema('cookmaster')
        .getTable('recipes')
        .update()
        .where('id = :id')
        .bind('id', id)
        .set('name', name)
        .set('ingredients', ingredients)
        .set('preparation', preparation)
        .execute(),
    )
    .then(() => getById(id))
);

const remove = async (id) => (
  connection()
    .then((session) =>
      session
        .getSchema('cookmaster')
        .getTable('recipes')
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

const addImageUrl = (recipeId, imageUrl) => (
  connection()
    .then((session) =>
      session
        .getSchema('cookmaster')
        .getTable('recipes')
        .update()
        .where('id = :id')
        .bind('id', recipeId)
        .set('image_url', imageUrl)
        .execute(),
    )
);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  addImageUrl,
};
