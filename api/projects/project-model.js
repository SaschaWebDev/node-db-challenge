const db = require('../../data/db-config.js');
const dbActionsHelper = require('../actions/action-model.js');

module.exports = {
  find,
  findById,
  update,
  remove,
  add,
};

async function helper(project_id) {
  try {
    const action = await dbActionsHelper.findByProjectId(project_id);
    console.log('ACTION', action[1]);
    return action[1];
  } catch (error) {
    console.log('ERROR', error);
  }
}

function find() {
  return db('projects as p')
    .join('actions as a', 'a.project_id', 'p.id')
    .select('p.id', 'p.name', 'p.description', 'p.isCompleted')
    .orderBy('p.id')
    .then(projects =>
      projects.map(project => ({
        ...project,
        isCompleted: Boolean(Number(project.isCompleted)),
        actions: helper(project.id),
      })),
    );
}

function findById(id) {
  return db('projects')
    .where('id', id)
    .first()
    .then(project =>
      project
        ? { ...project, isCompleted: Boolean(Number(project.isCompleted)) }
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
