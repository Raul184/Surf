const User = require('../models/User');

module.exports = {
  async postRegister(req, res, next){
    const nueUser = new User({
      username: req.body.username,
      email: req.body.email,
      image: req.body.image
    })
    
    await User.register( nueUser ,req.body.password)
    res.redirect('/')
  },
  logoutUser(req, res, next){
    req.logout()
    res.redirect('/')
  }
}