const Post = require('../models/Post');

module.exports = {
  async getPosts(req, res, next){
    let posts = await Post.find({})
    return res.json({
      status: 'success',
      posts
    })
  }
}