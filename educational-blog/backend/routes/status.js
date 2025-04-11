const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');

// @route   GET /api/status
// @desc    Get database connection status
// @access  Public
router.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  let status;
  
  switch(dbStatus) {
    case 0: status = "Disconnected"; break;
    case 1: status = "Connected"; break;
    case 2: status = "Connecting"; break;
    case 3: status = "Disconnecting"; break;
    default: status = "Unknown";
  }
  
  res.json({
    success: true,
    database: {
      status: status,
      connected: dbStatus === 1
    },
    server: "Running"
  });
});

// @route   GET /api/status/users
// @desc    Get all users (for admin/debugging purposes)
// @access  Public (should be restricted in production)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// @route   GET /api/status/blogs
// @desc    Get all blogs (for admin/debugging purposes)
// @access  Public (should be restricted in production)
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    });
  }
});

module.exports = router; 