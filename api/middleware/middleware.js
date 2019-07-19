const Projects = require('../projects/project-model.js');
const Actions = require('../actions/action-model.js');

module.exports = {
  validateProject,
  validateProjectId,
  /* validateProjectComplete*/
  validateAction,
  validateActionId,
  /* validateActionComplete*/
};

function validateProject(req, res, next) {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      message: 'There was not sufficient information given for a project.',
    });

  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json({
      message: 'Oops, there was no name or description given for a project.',
    });
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id);

    if (project) {
      req.project = project;
      next();
    } else {
      res
        .status(404)
        .json({ message: `The project with the id: ${id} was not found.` });
    }
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `There was an error getting the project with the id: ${id}.`,
    });
  }
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      message: 'There was not sufficient information given for an action.',
    });

  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes)
    return res.status(400).json({
      message:
        'Oops, there was no project_id or description or notes given for an action.',
    });
  next();
}

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Actions.findById(id);

    if (action) {
      req.action = action;
      next();
    } else {
      res
        .status(404)
        .json({ message: `The action with the id: ${id} was not found.` });
    }
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `There was an error getting the action with the id: ${id}.`,
    });
  }
}
