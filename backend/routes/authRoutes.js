// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { loginUser, registerUser } = require('../controllers/userController');

// @route POST /api/auth/login
// @desc Login user
// @access Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

router.post(
  '/register',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

module.exports = router;