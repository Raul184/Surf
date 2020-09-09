require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
const User = require('./models/User');
const session = require('express-session');
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');
const db = require('./helpers/db')

const app = express();
db();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '1mb'}));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'hang ten dude!',
  resave: false,
  saveUninitialized: true,
  // cookie: {secure: true}
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

// Mounted Routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);
app.use('*' , ( req , res , next ) => {
  return res.status(404).json({ msg: 'Sorry , page not found'})
})

app.listen(process.env.PORT, () => {
  console.log(`Server running: ${process.env.PORT}`)
});

module.exports = app;
