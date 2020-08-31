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

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'hang ten dude!',
  resave: false,
  saveUninitialized: true,
  // cookie: {secure: true}
}))
db();

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

app.listen(process.env.PORT)

module.exports = app;
