const express = require('express');

const Actions = require('./action-model.js');

const router = express.Router();

// GET ALL INGREDIENTS
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

module.exports = router;
