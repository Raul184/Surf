const express = require('express');
const router = express.Router();
const { postRegister, loginUser, logoutUser } = require("../controllers/Auth.js");
const { errorHandler } = require('../middleware/index');

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.status(200).json({ msg: 'Hello World' })
});

router.get('/register', (req, res, next) => {
  return res.status(200).json({ msg: 'Get User registered' })
});

router.post('/register', errorHandler(postRegister));

// Get logged in user
router.get('/login', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});

// Log In User
router.post('/login', loginUser);

// Logout User
router.get('/logout', logoutUser);

// Get Profile
router.get('/profile', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});

// Update Profile
router.put('/profile/:user_id', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});

// Forgot Password
router.get('/forgot_pw', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});

// Forgot Password
router.put('/forgot_pw', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});

// Reset Password
router.get('/reset_pw/:token', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});

// Reset Password
router.put('/reset_pw/:token', (req, res, next) => {
  return res.status(200).json({ msg: 'User registered' })
});


module.exports = router;
