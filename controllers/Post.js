const Post = require('../models/Post');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
  async getPosts(req, res, next) {
    let posts = await Post.find({});
    return res.json({
      status: "success",
      posts,
    });
  },
  newPost(req, res, next) {
    return res.json({
      status: "success",
      msg: "Easy check",
    });
  },
  async createPost(req, res, next) {
    req.body.images = []
    for(const file of req.files){
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.images.push({
        url: image.secure_url,
        public_id: image.public_id
      })
    }
    let post = await Post.create(req.body);
    res.redirect(`/posts/${post.id}`);
  },
  async showPost(req, res, next) {
    let singlePost = await Post.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      singlePost,
    });
  },
  async editPost(req, res, next) {
    let updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location,
    });
    Post.save(updatedPost);
    return res.status(200).json({
      status: "success",
      updatedPost,
    });
  },
  async updatePost(req, res, next) {
    // handle deletion of existing images
    let post = await Post.findById(req.params.id)
    // check imgs for deletion
    if(req.body.deleteImages && req.body.deleteImages.length){
      let deletion = req.body.deleteImages;
      for (const img_id of deletion){
        //cloudinary
        await cloudinary.v2.uploader.destroy(img_id)
        //mongoDB
        for(const image of post.images){
          if(image.public_id === public_id){
            let index = post.images.indexOf(image)
            post.images.splice(index, 1)
          }
        }
      }
    }
    // handle upload of new images
    if(req.files){
      for (const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id,
        });
      }
    }
    post.title = req.body.title
    post.description = req.body.description;
    post.price = req.body.price;
    post.location = req.body.location;

    post.save();
    res.redirect(`/posts/${post.id}`);
  },
  async deletePost(req, res, next) {
    let post = await Post.findById(req.params.id);
    for (const img of post.images){
      await cloudinary.v2.uploader.destroy(img.public_id);
    } 
    await post.remove();
    res.redirect(`/posts`);
  }
};