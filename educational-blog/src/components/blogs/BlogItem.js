import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaComment, FaUser, FaClock, FaTags, FaEye } from 'react-icons/fa';
import '../../styles/BlogItem.css';

const BlogItem = ({ blog }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (!blog) {
    return null;
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Handle click on blog item
  const handleBlogClick = () => {
    navigate(`/blogs/${blog._id || 'unknown'}`);
  };

  return (
    <motion.div 
      className="blog-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -10, 
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        transition: { duration: 0.3 }
      }}
      onClick={handleBlogClick}
    >
      <div className="blog-item-image">
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="loader"></div>
          </div>
        )}
        <motion.img 
          src={blog.coverImage || `https://source.unsplash.com/random/600x400?${(blog.category || 'education').toLowerCase()}`} 
          alt={blog.title || 'Blog post'}
          onLoad={() => setImageLoaded(true)}
          initial={false}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <div className="blog-category">
          <span>{blog.category || 'Uncategorized'}</span>
        </div>
        <div className="blog-overlay">
          <FaEye className="view-icon" />
          <span>Read Article</span>
        </div>
      </div>
      
      <div className="blog-item-content">
        <h3 className="blog-title">
          {blog.title || 'Untitled Post'}
        </h3>
        
        <p className="blog-summary">{blog.summary || 'No summary available for this post.'}</p>
        
        <div className="blog-meta">
          <div className="blog-author">
            <FaUser className="icon" />
            <span>{blog.author?.name || 'Anonymous'}</span>
          </div>
          <div className="blog-date">
            <FaClock className="icon" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
        
        <div className="blog-tags">
          {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 ? (
            <>
              <FaTags className="tags-icon" />
              {blog.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </>
          ) : (
            <span className="no-tags">No tags</span>
          )}
        </div>
        
        <div className="blog-stats">
          <div className="stat">
            <FaThumbsUp className="icon" />
            <span>{Array.isArray(blog.likes) ? blog.likes.length : (blog.likes || 0)}</span>
          </div>
          <div className="stat">
            <FaComment className="icon" />
            <span>{blog.comments && Array.isArray(blog.comments) ? blog.comments.length : 0}</span>
          </div>
        </div>
        
        <motion.div 
          className="read-more-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={`/blogs/${blog._id || 'unknown'}`} className="read-more">
            Read More
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogItem; 