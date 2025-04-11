const express = require('express');
const { 
    getBlogs, 
    getBlog, 
    createBlog, 
    updateBlog, 
    deleteBlog,
    addComment,
    likeBlog,
    getBlogCount
} = require('../controllers/blog');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getBlogs);

router.route('/count')
    .get(getBlogCount);

router.route('/:id')
    .get(getBlog)
    .put(protect, updateBlog)
    .delete(protect, deleteBlog);

router.route('/:id/comments')
    .post(protect, addComment);

router.route('/:id/like')
    .put(protect, likeBlog);

module.exports = router; 