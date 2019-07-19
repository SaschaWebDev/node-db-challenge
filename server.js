const express = require('express');
const helmet = require('helmet');
const moment = require('moment');

const ProjectRouter = require('./api/projects/project-router.js');
const ActionRouter = require('./api/actions/action-router.js');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the API of Sprint 12 Weekly Challenge</h2>`);
});

server.use(Requestlogger);
server.use(express.json());
server.use(helmet());
server.use('/api/projects', ProjectRouter);
server.use('/api/actions', ActionRouter);

function Requestlogger(req, res, next) {
  console.log(
    `${req.method} to http://localhost/5000${req.path} at `,
    moment().format(),
  );
  next();
}

module.exports = server;
