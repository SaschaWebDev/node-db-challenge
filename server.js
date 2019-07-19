const express = require('express');
const helmet = require('helmet');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the API of Sprint 12 Weekly Challenge</h2>`);
});

server.use(Requestlogger);
server.use(express.json());
server.use(helmet());

function Requestlogger(req, res, next) {
  console.log(
    `${req.method} to http://localhost/5000${req.path} at `,
    Date.now(),
  );
  next();
}

module.exports = server;
