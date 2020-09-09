const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // change 'upload/' to './uṕload'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const { errorHandler } = require('../middleware/index');
const {
  getPosts,
  newPost,
  createPost,
  showPost,
  editPost,
  updatePost,
  deletePost
} = require("../controllers/Post");

// Get Posts
router.get('/', errorHandler(getPosts))

// Get Posts New
router.get('/new', newPost)

// Create Posts       req.file
router.post("/", upload.array('images', 4), errorHandler(createPost));

// Get 1 Post : id
router.get('/:id', errorHandler(showPost))

// EDIT Posts
router.get('/:id/edit', errorHandler(editPost))

// Put Posts
router.put('/:id', errorHandler(updatePost))

// Delete Posts
router.delete('/:id', errorHandler(deletePost))


module.exports = router;