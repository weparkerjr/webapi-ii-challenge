// an api to manage channels
const express = require('express');



const server = express();

server.use(express.json());


// home route
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to webapi-ii-challenge' });
  });



// import router
const postsRouter = require('./posts/posts-router.js');


// router base routes
server.use('/api/posts', postsRouter);




server.listen(5000, () => console.log('\n***API up and running on PORT 5000***\n'));
