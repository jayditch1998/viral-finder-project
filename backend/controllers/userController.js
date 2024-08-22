const { checkUserCredentials, generateToken, registerUser } = require('../services/authService');
const { validationResult } = require('express-validator');

// Login user
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check user credentials
    const user = await checkUserCredentials(email, password);

    // Generate JWT token
    const token = generateToken(user);

    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: err.message });
  }
};

// Register user
exports.registerUser = async (req, res) => {
  console.log('request: ', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    const { token, user } = await registerUser(firstName, lastName, email, password);
    res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

