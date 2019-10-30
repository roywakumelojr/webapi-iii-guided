const express = require('express'); // importing a CommonJS module
const helmet = require('helmet'); // Security Package

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// The three amigos
function dateLogger(req, res, next) {
  console.log (new Date().toISOString());
  next();
}

function dateLogger(req, res, next) {
  console.log (`The Logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

// Class Task
// change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message

function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';
  if (password) {
    if (password.toLowerCase() === 'mellon') {
      next();
    } else {
    res.status(400).json({ error: 'Please provide a password' });
    }
  
  } else {
    res.status(400).json({ error: 'The provided username or password is incorrect' });
  }

}


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
server.use(dateLogger)
server.use(gateKeeper)

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
