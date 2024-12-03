const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {jwtSecret} = require('../config')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Environment variables for pepper and JWT secret
const PEPPER = process.env.PEPPER; // Replace with a secure value
const JWT_SECRET = jwtSecret; // Replace with a secure value

// ==============================
// Route 1: Create a new user route (POST "/api/auth/createuser")
// ==============================
router.post(
  '/createuser',
  [
    // Validate email
    body('email').isEmail().withMessage('Invalid email format'),
    // Validate name length
    body('name')
      .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
    // Validate password length
    body('password')
      .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters long'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 400 Bad Request (Validation failed)
    }

    // Destructure input values from the request body
    const { email, name, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' }); // 400 Bad Request (User already exists)
      }

      // Generate salt for hashing the password
      const salt = await bcrypt.genSalt(10);

      // Combine the password with the pepper (for additional security)
      const pepperedPassword = password + PEPPER;

      // Hash the password with the salt and pepper
      const hashedPassword = await bcrypt.hash(pepperedPassword, salt);

      // Create a new user with hashed password
      const newUser = new User({
        email: email.toLowerCase(),
        name,
        password: hashedPassword, // Store the hashed password
      });

      // Save the user to the database
      await newUser.save();

      // Generate a JWT token for the new user
      const payload = {
        user: {
          id: newUser._id,
        },
      };

      // Sign the token with the secret and set it to expire in 30 days
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

      // Send a success response with the token
      res.status(201).json({ token: token }); // 201 Created (User created successfully)
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
  }
);


// ==============================
// Route 2: Login route (POST "/api/auth/login")
// ==============================
router.post(
  '/login',
  [
    // Validate email format
    body('email').isEmail().withMessage('Invalid email format'),
    // Validate password length
    body('password').isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters long'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 400 Bad Request (Validation failed)
    }

    // Destructure input values from the request body
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ msg: 'Please try to login with the correct credentials' }); // 400 Bad Request (User not found)
      }

      // Combine the entered password with the pepper for comparison
      const pepperedPassword = password + PEPPER;

      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(pepperedPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Please login with the correct credentials' }); // 400 Bad Request (Incorrect password)
      }

      // Generate a JWT token for the authenticated user
      const payload = {
        user: {
          id: user._id,
        },
      };

      // Sign the token and set it to expire in 30 days
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

      // Send a success response with the JWT token
      res.json({ token:token , msg: 'Login Successfull' }); // 200 OK (Login successful, token sent)
    } catch (error) {
      console.error('Error logging in:', error.message);
      res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
    }
  }
);


// ==============================
// Route 3: Get logged in user details (POST "/api/auth/getuser") Login required
// ==============================
router.post('/getuser', require('../middleware/authenticateUser'), async (req, res) => {
  try {
    // Fetch the user from the database using the user ID from the token
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ msg: 'User not found' }); // 404 Not Found (User not found)
    }

    // Return the user details (excludUser already existsing password)
    res.json({
      name: user.name,
      email: user.email,
    }); // 200 OK (Successfully fetched user details)
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ msg: 'Internal Server error' }); // 500 Internal Server Error
  }
});

module.exports = router;
