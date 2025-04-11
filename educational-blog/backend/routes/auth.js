const express = require('express');
const { register, login, logout, getMe, getLoginHistory } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.get('/login-history', protect, getLoginHistory);

// Test route to manually add login information to a user
router.get('/test-login-record/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Add a test login entry
    user.loginHistory.push({
      date: new Date(),
      ipAddress: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Test Browser'
    });
    
    user.lastLogin = new Date();
    
    // Save the user
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Test login entry added',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin,
        loginHistory: user.loginHistory
      }
    });
  } catch (error) {
    console.error('Error in test login route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Test route to create a test user
router.get('/test-create-user', async (req, res) => {
  try {
    // Create a random name/email to avoid duplicates
    const random = Math.floor(Math.random() * 10000);
    const userData = {
      name: `Test User ${random}`,
      email: `testuser${random}@example.com`,
      password: 'password123',
      bio: 'This is a test user created via the test API.'
    };
    
    // First check if user exists (by email)
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: 'User already exists',
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          lastLogin: existingUser.lastLogin,
          loginHistory: existingUser.loginHistory
        }
      });
    }
    
    // Create new user
    const user = await User.create(userData);
    
    // Add test login history
    user.loginHistory.push({
      date: new Date(),
      ipAddress: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Test Browser' 
    });
    
    user.lastLogin = new Date();
    
    // Save the user to persist login history
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'Test user created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin,
        loginHistory: user.loginHistory
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router; 