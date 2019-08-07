// is in charge of urls beginning with /api/channels
const router = require('express').Router();

const Posts = require('../data/db.js');



// POSTS----------------------------------------------------


// 1. POST   | /api/posts              | Creates a post using the information sent inside the `request body`.

router.post('/', (req, res) => {
    const { title, contents } = req.body;
  
    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
    } 

    Posts.insert(req.body)
      .then(post => {
            res.status(201).json(post);
        }
      ) 
      .catch(error => {
        res.status(500).json({ message: 'error: "There was an error while saving the post to the database' });
     }) ;
  });


// 2. POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`

router.post("/:id/comments", (req, res) => {
    const text = req.body.text;
    const id = req.params.id;
  
  Posts.findById(id)
    .then(found =>{
        //res.status(200).json(found);

    if(found && found.length){
      Posts.insertComment({text: text, post_id: id})  
    .then( commentResponse => {
        console.log("text", text);
        console.log("id", id);
        if(text){
          res.status(201).json(commentResponse);
        } 
        else {
          res.status(400).json({ errorMessage: "Please provide text for the comment." });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database"});
      })
    } else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }  
  })
  });


// 3. GET    | /api/posts              | Returns an array of all the post objects contained in the database.

router.get('/', (req, res) => {
    // res.status(200).json({ message: 'This is coming through'    })

    Posts.find()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(500).json({ message: 'The posts information could not be retrieved' });
      })
  });



// 4. GET    | /api/posts/:id          | Returns the post object with the specified id. 


router.get('/:id', (req, res) => {
    const postId = req.params.id;
  
    Posts.findById(postId)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'The post information could not be retrieved' });
      })  
});


// 5. GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.

router.get("/:id/comments", (req, res) => {
    const id = req.params.id;
        console.log("id", id)
    Posts.findPostComments(id)
    .then(commentRes => {
      if(commentRes && commentRes.length){
        res.status(200).json(commentRes);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({error: "The cinnebts information could not be retrieved"});
    })
  })


// 6. DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |


router.delete('/:id', (req, res) => {
    const userId = req.params.id;
  
    Posts.remove(userId)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'The post  could not be removed' });
      })  
  });


// 7. PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.           


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents }= req.body;

    // catch wire
    if (!title || !contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post' });
    } 
    // updating
    Posts.update(id, req.body)
      .then(post => {
        if (user) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'The post information could not be modified' });
      })  
});


  // export default router;
module.exports = router;