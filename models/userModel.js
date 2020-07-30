const connection = require('./connection');

const findByEmail = async (emailParam) => (
  connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .select(['id', 'name', 'email', 'password', 'role'])
        .where('email = :email')
        .bind('email', emailParam)
        .execute()
    ))
    .then((results) => results.fetchAll())
    .then((users) => (
      users.map(([id, name, email, password, role]) => ({
        id,
        name,
        email,
        password,
        role,
      }))[0]
    ))
);

const create = async (name, email, password) => (
  connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .insert(['name', 'email', 'password'])
        .values([name, email, password])
        .execute()
    ))
    .then(() => ({
      name,
      email,
      password,
      role: 'user',
    }))
);

module.exports = {
  findByEmail,
  create,
};
