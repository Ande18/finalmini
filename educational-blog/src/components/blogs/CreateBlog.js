import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImage, FaTags, FaBookOpen, FaPen } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../../utils/api';
import '../../styles/BlogForm.css';

const CreateBlog = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    tags: '',
    coverImage: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, content, summary, category, tags, coverImage } = formData;

  const categories = [
    'Technology', 'Science', 'Mathematics', 'Language', 
    'Arts', 'History', 'Geography', 'Philosophy', 
    'Psychology', 'Health', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !content || !summary || !category) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Process tags into array
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (tagsArray.length > 5) {
      setError('You can only add up to 5 tags');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const blogData = {
        title,
        content,
        summary,
        category,
        tags: tagsArray,
        coverImage: coverImage || undefined
      };
      
      await createBlog(blogData);
      
      // Redirect to blogs page
      navigate('/blogs');
    } catch (err) {
      setError(err.message || 'Error creating blog post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <motion.div 
      className="blog-form-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <FaPen className="icon" /> Create New Blog
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Share your knowledge with the world
        </motion.p>
      </div>
      
      {error && (
        <motion.div 
          className="alert alert-danger"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.form 
        className="blog-form" 
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="title">
            <FaBookOpen className="icon" /> Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter a catchy title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="summary">
            Summary <span className="required">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            placeholder="Brief summary of your blog (max 200 characters)"
            maxLength="200"
            required
            rows="3"
          ></textarea>
          <div className="char-count">{summary.length}/200</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">
            <FaTags className="icon" /> Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={handleChange}
            placeholder="e.g. javascript, programming, web development"
          />
          <div className="help-text">You can add up to 5 tags</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="coverImage">
            <FaImage className="icon" /> Cover Image URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={coverImage}
            onChange={handleChange}
            placeholder="Enter URL for cover image"
          />
          {coverImage && (
            <div className="image-preview">
              <img src={coverImage} alt="Cover" />
            </div>
          )}
        </div>
        
        <div className="form-group editor-group">
          <label>
            Content <span className="required">*</span>
          </label>
          <ReactQuill
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            placeholder="Write your blog content here..."
            theme="snow"
          />
        </div>
        
        <div className="form-actions">
          <motion.button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/blogs')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Submitting...' : 'Create Blog'}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default CreateBlog; 