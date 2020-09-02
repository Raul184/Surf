const User = require('../models/User');

module.exports = {
  postRegister(req, res, next){
    console.log('BODY', req.body)
    const nueUser = new User({
      username: req.body.username,
      email: req.body.email,
      image: req.body.image
    })
    User.register( nueUser ,req.body.password, 
      (err) => {
        if(err) {
          console.log('user reg-errored')
          return next(err);
        }
        res.redirect('/')
      }
    )
  }
}