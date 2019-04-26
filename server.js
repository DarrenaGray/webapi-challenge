const express = require('express');

const server = express();

const projectRouter = require('./data/helpers/projectRouter');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`It's Working!`);
});

server.use('/api/projects', projectRouter)

module.exports = server;