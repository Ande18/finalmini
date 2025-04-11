import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { getBlogById, updateBlog } from '../../utils/api';
import '../../styles/CreateEditBlog.css';

const EditBlog = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    tags: [],
    coverImage: '',
    buttonExplanations: {
      blueButton: 'Like Button - Click this blue button to show appreciation for content you find valuable and informative.',
      yellowButton: 'Share Button - Use this yellow button to share content with friends, colleagues, or on social media.',
      redButton: 'Delete Button - This red button is for authors to remove their own content when needed.'
    }
  });
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blog = await getBlogById(id);
        
        // Ensure the current user is the author
        if (user && blog.author && user._id !== blog.author._id) {
          setError('You are not authorized to edit this blog');
          setLoading(false);
          return;
        }
        
        setFormData({
          title: blog.title || '',
          content: blog.content || '',
          summary: blog.summary || '',
          category: blog.category || '',
          tags: blog.tags || [],
          coverImage: blog.coverImage || '',
          buttonExplanations: {
            blueButton: blog.buttonExplanations?.blueButton || 'Like Button - Click this blue button to show appreciation for content you find valuable and informative.',
            yellowButton: blog.buttonExplanations?.yellowButton || 'Share Button - Use this yellow button to share content with friends, colleagues, or on social media.',
            redButton: blog.buttonExplanations?.redButton || 'Delete Button - This red button is for authors to remove their own content when needed.'
          }
        });
        setLoading(false);
      } catch (err) {
        setError('Error loading blog');
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleButtonExplanationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      buttonExplanations: {
        ...formData.buttonExplanations,
        [name]: value
      }
    });
  };
  
  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({
      ...formData,
      tags
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.summary || !formData.category) {
      setError('Please fill all required fields');
      return;
    }
    
    try {
      setSubmitting(true);
      await updateBlog(id, formData);
      navigate(`/blogs/${id}`);
    } catch (err) {
      setError(err.message || 'Error updating blog');
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="edit-blog-container loading">
        <div className="loader"></div>
        <p>Loading blog...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="edit-blog-container error">
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/blogs')}
        >
          Back to Blogs
        </button>
      </div>
    );
  }
  
  return (
    <div className="edit-blog-container">
      <div className="edit-blog-header">
        <motion.button 
          className="back-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/blogs/${id}`)}
        >
          <FaArrowLeft /> Back to Blog
        </motion.button>
        <h1>Edit Blog</h1>
      </div>
      
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title <span className="required">*</span></label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="summary">Summary <span className="required">*</span></label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            maxLength={200}
            required
          />
          <small>{formData.summary.length}/200 characters</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category <span className="required">*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Environmental Science">Environmental Science</option>
            <option value="Astronomy">Astronomy</option>
            <option value="Psychology">Psychology</option>
            <option value="Sociology">Sociology</option>
            <option value="Political Science">Political Science</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Languages">Languages</option>
            <option value="Literature">Literature</option>
            <option value="Education">Education</option>
            <option value="Arts">Arts</option>
            <option value="Music">Music</option>
            <option value="Photography">Photography</option>
            <option value="Health">Health</option>
            <option value="Medicine">Medicine</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Sports Science">Sports Science</option>
            <option value="Business">Business</option>
            <option value="Economics">Economics</option>
            <option value="Engineering">Engineering</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="e.g. javascript, react, web development"
          />
          <small>{formData.tags.length}/5 tags maximum</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content <span className="required">*</span></label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            required
          ></textarea>
        </div>

        <div className="button-explanations-section">
          <h3>Button Explanations</h3>
          <p className="explanation-note">Customize what each colored button means in your blog post</p>
          
          <div className="form-group">
            <label htmlFor="blueButton">
              <span className="color-dot blue-dot"></span> Blue Button Explanation
            </label>
            <input
              type="text"
              id="blueButton"
              name="blueButton"
              value={formData.buttonExplanations.blueButton}
              onChange={handleButtonExplanationChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="yellowButton">
              <span className="color-dot yellow-dot"></span> Yellow Button Explanation
            </label>
            <input
              type="text"
              id="yellowButton"
              name="yellowButton"
              value={formData.buttonExplanations.yellowButton}
              onChange={handleButtonExplanationChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="redButton">
              <span className="color-dot red-dot"></span> Red Button Explanation
            </label>
            <input
              type="text"
              id="redButton"
              name="redButton"
              value={formData.buttonExplanations.redButton}
              onChange={handleButtonExplanationChange}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <motion.button 
            type="button" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/blogs/${id}`)}
          >
            <FaTimes /> Cancel
          </motion.button>
          <motion.button 
            type="submit" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
          >
            <FaSave /> {submitting ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog; 