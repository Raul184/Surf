const Post = require('../models/Post');

module.exports = {
  async getPosts(req, res, next){
    let posts = await Post.find({})
    return res.json({
      status: 'success',
      posts
    })
  },
  newPost(req,res,next){
    return res.json({
      status: 'success',
      msg: 'Easy check'
    })
  },
  async createPost(req,res,next){
    let post = await Post.create(req.body)
    res.redirect(`/posts/${post.id}`)
  }
}