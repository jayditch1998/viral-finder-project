// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { loginUser, registerUser } = require('../controllers/userController');
const { processApifyAPI } = require('../controllers/apifyController');

// @route POST /api/auth/login
// @desc Login user
// @access Public
router.post('/find-user', processApifyAPI);

module.exports = router;