const Blog = require('../models/Blog');
const User = require('../models/User');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
    try {
        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        let query = Blog.find(JSON.parse(queryStr)).populate({
            path: 'author',
            select: 'name avatar'
        });

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Blog.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const blogs = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: blogs.length,
            pagination,
            data: blogs
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate({
            path: 'author',
            select: 'name avatar bio'
        }).populate({
            path: 'comments.user',
            select: 'name avatar'
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog not found with id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
    try {
        // Add author to req.body
        req.body.author = req.user.id;

        const blog = await Blog.create(req.body);

        res.status(201).json({
            success: true,
            data: blog
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog not found with id of ${req.params.id}`
            });
        }

        // Make sure user is blog owner
        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this blog`
            });
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog not found with id of ${req.params.id}`
            });
        }

        // Make sure user is blog owner
        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this blog`
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog not found with id of ${req.params.id}`
            });
        }

        const comment = {
            text: req.body.text,
            user: req.user.id
        };

        blog.comments.push(comment);
        await blog.save();

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Like/Unlike a blog
// @route   PUT /api/blogs/:id/like
// @access  Private
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog not found with id of ${req.params.id}`
            });
        }

        // Check if the blog has already been liked by the user
        const alreadyLiked = blog.likedBy.includes(req.user.id);

        if (alreadyLiked) {
            // Unlike
            blog.likes = blog.likes - 1;
            blog.likedBy = blog.likedBy.filter(
                userId => userId.toString() !== req.user.id
            );
        } else {
            // Like
            blog.likes = blog.likes + 1;
            blog.likedBy.push(req.user.id);
        }

        await blog.save();

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    Get count of blogs
// @route   GET /api/blogs/count
// @access  Public
exports.getBlogCount = async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting blog count'
    });
  }
}; 