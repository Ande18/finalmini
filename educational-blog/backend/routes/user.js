const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateProfile, 
  updatePassword,
  getUserBlogs,
  getUserCount
} = require('../controllers/user');
const { protect } = require('../middleware/auth');

// @route   GET /api/users/count
// @desc    Get count of users
// @access  Public
router.get('/count', getUserCount);

// @route   PUT /api/users/me
// @desc    Update profile
// @access  Private
router.put('/me', protect, updateProfile);

// @route   PUT /api/users/me/password
// @desc    Update password
// @access  Private
router.put('/me/password', protect, updatePassword);

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   GET /api/users/:id/blogs
// @desc    Get user blogs
// @access  Public
router.get('/:id/blogs', getUserBlogs);

module.exports = router; 