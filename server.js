// an api to manage channels
const express = require('express');

// import router
// const channelsRouter = require('./channels/channels-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to webapi-ii-challenge' });
});

// router base routes
// server.use('/api/channels', channelsRouter);

// list channels



server.listen(5000, () => console.log('\n***API up and running***\n'));
