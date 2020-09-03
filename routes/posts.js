const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/index');
const { getPosts } = require('../controllers/Post');

// Get Posts
router.get('/', errorHandler(getPosts))

// Get Posts New
router.get('/new', (req, res, next) => {
  res.send('/posts/new')
})

// Create Posts
router.post('/', (req, res, next) => {
  res.send('/CREATE posts')
})

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