import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaClock, FaThumbsUp, FaComment, FaEdit, FaTrash, FaShare, FaInfoCircle } from 'react-icons/fa';
import { getBlogById, likeBlog, addComment, deleteBlog } from '../../utils/api';
import '../../styles/BlogDetail.css';

const BlogDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showButtonInfo, setShowButtonInfo] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response);
      } catch (err) {
        setError('Error loading blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await likeBlog(id);
      setBlog(response);
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!comment.trim()) return;
    
    try {
      setSubmitting(true);
      const response = await addComment(id, comment);
      setBlog(response);
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      await deleteBlog(id);
      navigate('/blogs');
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  const toggleButtonInfo = () => {
    setShowButtonInfo(!showButtonInfo);
  };

  if (loading) {
    return (
      <div className="blog-detail-container loading-container">
        <div className="loader"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-container error-container">
        <h2>Error</h2>
        <p>{error || 'Blog post not found'}</p>
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const isAuthor = user && blog.author && user._id === blog.author._id;

  return (
    <motion.div 
      className="blog-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="blog-detail-header">
        <motion.div 
          className="blog-header-image"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src={blog.coverImage || `https://source.unsplash.com/random/1200x600?${blog.category.toLowerCase()}`} 
            alt={blog.title} 
          />
          <div className="blog-category-badge">
            <span>{blog.category}</span>
          </div>
        </motion.div>
        
        <div className="blog-header-content">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {blog.title}
          </motion.h1>
          
          <motion.div 
            className="blog-meta"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="author">
              <FaUser className="icon" />
              <span>{blog.author?.name || 'Anonymous'}</span>
            </div>
            <div className="date">
              <FaClock className="icon" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="likes">
              <FaThumbsUp className="icon" />
              <span>{blog.likes?.length || 0}</span>
            </div>
            <div className="comments">
              <FaComment className="icon" />
              <span>{blog.comments?.length || 0}</span>
            </div>
          </motion.div>

          <motion.div 
            className="blog-tags"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {blog.tags && blog.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="blog-actions">
        <motion.button 
          className="action-btn like-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
        >
          <FaThumbsUp />
          <span>Like</span>
        </motion.button>
        
        <motion.button 
          className="action-btn share-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
        >
          <FaShare />
          <span>Share</span>
        </motion.button>
        
        {isAuthor && (
          <>
            <motion.button 
              className="action-btn edit-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/edit-blog/${blog._id}`)}
            >
              <FaEdit />
              <span>Edit</span>
            </motion.button>
            
            <motion.button 
              className="action-btn delete-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setConfirmDelete(true)}
            >
              <FaTrash />
              <span>Delete</span>
            </motion.button>
          </>
        )}
        
        <motion.button
          className="action-btn info-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleButtonInfo}
        >
          <FaInfoCircle />
          <span>Button Info</span>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showButtonInfo && (
          <motion.div 
            className="button-info-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="button-info-header">
              <h3>What do the buttons do?</h3>
              <button className="close-btn" onClick={toggleButtonInfo}>×</button>
            </div>
            <div className="button-info-content">
              <div className="button-info-item">
                <div className="button-info-icon blue-icon">
                  <FaThumbsUp />
                </div>
                <div className="button-info-text">
                  <strong>Blue Button (Like):</strong> Shows appreciation for content you find valuable and informative.
                </div>
              </div>
              <div className="button-info-item">
                <div className="button-info-icon yellow-icon">
                  <FaShare />
                </div>
                <div className="button-info-text">
                  <strong>Yellow Button (Share):</strong> Copies the link to share content with friends, colleagues, or on social media.
                </div>
              </div>
              <div className="button-info-item">
                <div className="button-info-icon red-icon">
                  <FaTrash />
                </div>
                <div className="button-info-text">
                  <strong>Red Button (Delete):</strong> Allows authors to remove their own content when needed (only visible to the author).
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="blog-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      
      {/* Button explanations section */}
      <motion.div 
        className="button-explanations"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h3>Button Guide</h3>
        <div className="button-explanation-item">
          <div className="button-icon blue-icon">
            <FaThumbsUp />
          </div>
          <div className="button-explanation-text">
            {blog.buttonExplanations?.blueButton || "Like Button - Click this blue button to show appreciation for content you find valuable and informative."}
          </div>
        </div>
        <div className="button-explanation-item">
          <div className="button-icon yellow-icon">
            <FaShare />
          </div>
          <div className="button-explanation-text">
            {blog.buttonExplanations?.yellowButton || "Share Button - Use this yellow button to share content with friends, colleagues, or on social media."}
          </div>
        </div>
        {isAuthor && (
          <div className="button-explanation-item">
            <div className="button-icon red-icon">
              <FaTrash />
            </div>
            <div className="button-explanation-text">
              {blog.buttonExplanations?.redButton || "Delete Button - This red button is for authors to remove their own content when needed."}
            </div>
          </div>
        )}
        {isAuthor && (
          <div className="edit-button-explanation">
            <Link to={`/edit-blog/${blog._id}`} className="edit-explanation-link">
              <FaEdit /> Edit button explanations
            </Link>
          </div>
        )}
      </motion.div>
      
      <div className="blog-comments-section">
        <h3>Comments ({blog.comments?.length || 0})</h3>
        
        {user ? (
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <motion.button 
              type="submit" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </motion.button>
          </form>
        ) : (
          <div className="login-prompt">
            <p>Please <Link to="/login">login</Link> to post a comment.</p>
          </div>
        )}
        
        <div className="comments-list">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <motion.div 
                key={comment._id || index}
                className="comment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="comment-header">
                  <div className="comment-author">
                    <FaUser className="icon" />
                    <span>{comment.user?.name || 'Anonymous'}</span>
                  </div>
                  <div className="comment-date">
                    <FaClock className="icon" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <div className="comment-body">
                  <p>{comment.text}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-comments">
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {confirmDelete && (
          <motion.div 
            className="delete-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="delete-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
              <div className="delete-modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleDeleteBlog}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogDetail; 