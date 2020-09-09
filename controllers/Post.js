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
  },
  async showPost(req, res,next){
    let singlePost = await Post.findById(req.params.id)
    return res.status(200).json({
      status: 'success',
      singlePost
    })
  },
  async editPost(req, res, next) {
    let updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location
    })
    Post.save(updatedPost)
    return res.status(200).json({
      status: 'success',
      updatedPost
    })
  },
  async updatePost(req, res, next){
    const toUpdate = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.redirect(`/posts/${toUpdate.id}`) 
  }
}