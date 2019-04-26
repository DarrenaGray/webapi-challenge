const express = require('express');

const server = express();

const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/projectRouter');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`It's Working!`);
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;