const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

const middleware = require('../middleware/middleware.js');

// GET ALL PROJECTS
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find(req.query);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error finding all projects. Sorry, that is on us!',
    });
  }
});

// GET A PROJECT BY PROJECT ID
router.get('/:id', middleware.validateProjectId, async (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `There was an error getting the project with the id: ${id}.`,
    });
  }
});

// ADD A NEW PROJECT
router.post('/', middleware.validateProject, async (req, res) => {
  try {
    const newProject = await Projects.add(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while adding the project to the database.',
    });
  }
});

// UPDATE A PROJECT BY PROJECT ID
router.put(
  '/:id',
  middleware.validateProjectId,
  middleware.validateProject,
  async (req, res) => {
    try {
      const { id } = req.params;

      const updatedProject = await Projects.update(id, req.body);
      res.status(200).json(updatedProject);
    } catch (error) {
      const { id } = req.params;

      res.status(500).json({
        error: `There was an error updating the project with the id: ${id}.`,
      });
    }
  },
);

// DELETE A PROJECT BY PROJECT ID
router.delete('/:id', middleware.validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;

    const successFlag = await Projects.remove(id);
    if (successFlag > 0) {
      res.status(200).json(req.project);
    }
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `The project with the id: ${id} could not be removed from the database.`,
    });
  }
});

module.exports = router;
