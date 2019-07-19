const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('actions');
}

function findById(id) {
  return db('actions')
    .where({ id: id })
    .first()
    .then(action => (action ? action : null));
}

function add(action) {
  return db('actions')
    .insert(action)
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return db('actions')
    .where({ id: id })
    .update(changes)
    .then(successFlag => (successFlag > 0 ? this.findById(id) : null));
}

function remove(id) {
  return !findById(id)
    ? null
    : db('actions')
        .where('id', id)
        .del();
}
