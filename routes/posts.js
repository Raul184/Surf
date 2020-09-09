const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/index');
const { 
  getPosts , 
  newPost, 
  createPost,
  showPost,
  editPost,
  updatePost
} = require('../controllers/Post');

// Get Posts
router.get('/', errorHandler(getPosts))

// Get Posts New
router.get('/new', newPost)

// Create Posts
router.post('/', errorHandler(createPost))

// Get 1 Post : id
router.get('/:id', errorHandler(showPost))

// EDIT Posts
router.get('/:id/edit', errorHandler(editPost))

// Put Posts
router.put('/:id', errorHandler(updatePost))

// Delete Posts
router.delete('/id', (req, res, next) => {
  res.send('DELETE /posts/:id')
})


module.exports = router;