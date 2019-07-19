const db = require('../../data/db-config.js');
const dbActionsHelper = require('../actions/action-model.js');

module.exports = {
  find,
  findById,
  update,
  remove,
  add,
};

function find() {
  return db('projects as p')
    .join('actions as a', 'a.project_id', 'p.id')
    .select('p.id', 'p.name', 'p.description', 'p.isCompleted')
    .distinct('p.id')
    .orderBy('p.id');
}

function findById(id) {
  return db('projects')
    .where('id', id)
    .first()
    .then(project =>
      project
        ? {
            ...project,
            isCompleted: Boolean(Number(project.isCompleted)),
          }
        : null,
    );
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
