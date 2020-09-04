const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/index');
const { 
  getPosts , 
  newPost, 
  createPost
} = require('../controllers/Post');

// Get Posts
router.get('/', errorHandler(getPosts))

// Get Posts New
router.get('/new', newPost)

// Create Posts
router.post('/', errorHandler(createPost))

// Get 1 Post : id
router.get('/:id', (req, res, next) => {
  res.send('SHOW /posts/:id')
})

// EDIT Posts
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/edit')
})

// Put Posts
router.put('/:id', (req, res, next) => {
  res.send('Update /posts/:id')
})

// Delete Posts
router.delete('/id', (req, res, next) => {
  res.send('DELETE /posts/:id')
})


module.exports = router;