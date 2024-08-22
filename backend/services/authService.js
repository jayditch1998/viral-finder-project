const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Check user credentials
const checkUserCredentials = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};

// Generate JWT token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (firstName, lastName, email, password) => {
  console.log('f name: ', firstName);
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    userId: user._id,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};

module.exports = { checkUserCredentials, generateToken, registerUser };
