const express = require('express');
const router = express.Router({mergeParams: true});

// Get Reviews
router.get('/', (req, res, next) => {
  res.send('/Reviews')
})

// Create Reviews New
router.post('/', (req, res, next) => {
  res.send('/Create reviews')
})

// Get 
router.get('/:review_id/edit', (req, res, next) => {
  res.send('SHOW /Reviews/:id')
})

// Put Reviews
router.put('/:review_id', (req, res, next) => {
  res.send('Update /Reviews/:id')
})

// Delete Reviews
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /Reviews/:id')
})


module.exports = router;