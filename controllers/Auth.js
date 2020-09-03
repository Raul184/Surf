const User = require('../models/User');
const passport = require('passport');

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
  },
  loginUser(req,res,next){
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })(req,res,next);
  }
}