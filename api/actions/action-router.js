const express = require('express');

const Actions = require('./action-model.js');

const router = express.Router();

const middleware = require('../middleware/middleware.js');

// GET ALL ACTIONS
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.find(req.query);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error finding all actions. Sorry, that is on us!',
    });
  }
});

// GET AN ACTION BY ACTION ID
router.get('/:id', middleware.validateActionId, async (req, res) => {
  try {
    res.status(200).json(req.action);
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `There was an error getting the action with the id: ${id}.`,
    });
  }
});

// ADD A NEW ACTION
router.post('/', middleware.validateAction, async (req, res) => {
  try {
    const newAction = await Actions.add(req.body);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while adding the action to the database.',
    });
  }
});

// UPDATE AN ACTION BY ACTION ID
router.put(
  '/:id',
  middleware.validateActionId,
  middleware.validateAction,
  async (req, res) => {
    try {
      const { id } = req.params;

      const updatedAction = await Actions.update(id, req.body);
      res.status(200).json(updatedAction);
    } catch (error) {
      const { id } = req.params;

      res.status(500).json({
        error: `There was an error updating the action with the id: ${id}.`,
      });
    }
  },
);

// DELETE AN ACTION BY ACTION ID
router.delete('/:id', middleware.validateActionId, async (req, res) => {
  try {
    const { id } = req.params;

    const successFlag = await Actions.remove(id);
    if (successFlag > 0) {
      res.status(200).json(req.action);
    }
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `The action with the id: ${id} could not be removed from the database.`,
    });
  }
});

// GET ALL ACTIONS OF A PROJECT_ID
router.get('/project/:id/', async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.findByProjectId(id);
    res.status(200).json(action);
  } catch (error) {
    const { id } = req.params;

    res.status(500).json({
      error: `There was an error getting the actions of the project with the id: ${id}.`,
    });
  }
});

module.exports = router;
