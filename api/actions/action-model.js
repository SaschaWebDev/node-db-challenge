const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findByProjectId,
};

function find() {
  return db('actions as a')
    .select('a.id', 'a.project_id', 'a.description', 'a.notes', 'a.isCompleted')
    .orderBy('a.id')
    .then(actions =>
      actions.map(action => ({
        ...action,
        isCompleted: Boolean(Number(action.isCompleted)),
      })),
    );
}

function findById(id) {
  return db('actions')
    .where({ id: id })
    .first()
    .then(action =>
      action
        ? { ...action, isCompleted: Boolean(Number(action.isCompleted)) }
        : null,
    );
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

function findByProjectId(project_id) {
  return db('actions as a')
    .select('a.id', 'a.project_id', 'a.description', 'a.notes', 'a.isCompleted')
    .where({ project_id: project_id })
    .orderBy('a.id')
    .then(actions =>
      actions.map(action => ({
        ...action,
        isCompleted: Boolean(Number(action.isCompleted)),
      })),
    );
}
