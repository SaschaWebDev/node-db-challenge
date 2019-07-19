const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  update,
  remove,
  add,
};

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
    .where('id', id)
    .first()
    .then(project => (project ? project : null));
}

function add(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('projects')
    .where('id', id)
    .update(changes)
    .then(successFlag => (successFlag > 0 ? this.findById(id) : null));
}

function remove(id) {
  return !findById(id)
    ? null
    : db('projects')
        .where('id', id)
        .del();
}
