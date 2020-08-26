const express = require('express');
const router = express.Router();

// Get Reviews
router.get('/', (req, res, next) => {
  res.send('/Reviews')
})

// Get Reviews New
router.get('/new', (req, res, next) => {
  res.send('/Reviews/new')
})

// Create Reviews
router.post('/', (req, res, next) => {
  res.send('/CREATE Reviews')
})

// Get 1 Post : id
router.get('/:id', (req, res, next) => {
  res.send('SHOW /Reviews/:id')
})

// EDIT Reviews
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /Reviews/:id/edit')
})

// Put Reviews
router.put('/:id', (req, res, next) => {
  res.send('Update /Reviews/:id')
})

// Delete Reviews
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /Reviews/:id')
})


module.exports = router;