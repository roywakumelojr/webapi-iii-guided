const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // Security Package

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// The three amigos
// function dateLogger(req, res, next) {
//   console.log (new Date().toISOString());
// }

//HTTP and URL Logger
function historyLogger(req, res, next) {
  console.log (`${req.method} to ${req.url}`);

  next();
}

server.use(express.json());

// Global middleware (runs on ever request that comes into the server)
server.use(helmet())
server.use('/api/hubs', hubsRouter);
server.use(historyLogger);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
