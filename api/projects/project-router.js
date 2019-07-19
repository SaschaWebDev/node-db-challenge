const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

// GET ALL INGREDIENTS
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

module.exports = router;
