import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, FaPen, FaBlog, FaSignOutAlt, FaEdit, FaEye, FaTrash, 
  FaSortAmountDown, FaSortAmountUp, FaChartBar, 
  FaThumbsUp, FaComment, FaClock, FaCalendar,
  FaCheckCircle, FaFilter, FaTags
} from 'react-icons/fa';
import { getUserBlogs, deleteBlog } from '../utils/api';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('blogs');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('All');
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalLikes: 0,
    totalComments: 0,
    categoryCounts: {},
    monthlyActivity: {}
  });

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        setLoading(true);
        
        if (!user || !user._id) {
          setError('User data not found');
          setBlogs([]);
          setLoading(false);
          return;
        }
        
        const response = await getUserBlogs(user._id);
        // Make sure blogs is always an array
        let blogData = [];
        if (response && Array.isArray(response)) {
          blogData = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          blogData = response.data;
        } else {
          console.warn('Invalid blog data format:', response);
        }
        
        setBlogs(blogData);
        
        // Calculate stats
        calculateStats(blogData);
      } catch (err) {
        console.error('Error loading blogs:', err);
        setError('Error loading your blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [user]);

  const calculateStats = (blogData) => {
    if (!Array.isArray(blogData)) return;
    
    const newStats = {
      totalBlogs: blogData.length,
      totalLikes: 0,
      totalComments: 0,
      categoryCounts: {},
      monthlyActivity: {}
    };
    
    blogData.forEach(blog => {
      // Count likes
      newStats.totalLikes += Array.isArray(blog.likes) ? blog.likes.length : (blog.likes || 0);
      
      // Count comments
      const commentCount = blog.comments && Array.isArray(blog.comments) ? blog.comments.length : 0;
      newStats.totalComments += commentCount;
      
      // Count by category
      const category = blog.category || 'Uncategorized';
      newStats.categoryCounts[category] = (newStats.categoryCounts[category] || 0) + 1;
      
      // Monthly activity
      if (blog.createdAt) {
        const date = new Date(blog.createdAt);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        newStats.monthlyActivity[monthYear] = (newStats.monthlyActivity[monthYear] || 0) + 1;
      }
    });
    
    setStats(newStats);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId);
      const updatedBlogs = blogs.filter(blog => blog._id !== blogId);
      setBlogs(updatedBlogs);
      calculateStats(updatedBlogs);
      setConfirmDelete(null);
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  // Get unique categories
  const categories = ['All', ...new Set(blogs.map(blog => blog.category || 'Uncategorized'))];

  // Filter blogs by category
  const filteredBlogs = filterCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => (blog.category || 'Uncategorized') === filterCategory);

  // Sort blogs by date
  const sortedBlogs = Array.isArray(filteredBlogs) 
    ? [...filteredBlogs].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      })
    : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Manage your content and profile
        </motion.p>
      </div>

      <div className="dashboard-user-info">
        <div className="user-avatar">
          <img 
            src={user?.avatar || 'https://via.placeholder.com/100'} 
            alt={user?.name || 'User'} 
          />
        </div>
        <div className="user-details">
          <h2>{user?.name || 'User'}</h2>
          <p>{user?.email || 'No email'}</p>
          <p>Joined: {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</p>
        </div>
      </div>

      <div className="dashboard-tabs">
        <motion.button 
          className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBlog className="icon" /> My Blogs
        </motion.button>
        <motion.button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChartBar className="icon" /> Analytics
        </motion.button>
        <motion.button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUser className="icon" /> Profile
        </motion.button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'blogs' && (
          <div className="blogs-tab">
            <div className="tab-header">
              <h2>Your Blogs</h2>
              <div className="tab-actions">
                <div className="filter-container">
                  <FaFilter className="filter-icon" />
                  <select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="category-filter"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <motion.button 
                  className="sort-btn"
                  onClick={toggleSortOrder}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                </motion.button>
                <motion.button 
                  className="btn btn-primary create-btn"
                  onClick={() => navigate('/create-blog')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPen className="icon" /> Create New Blog
                </motion.button>
              </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            
            {loading ? (
              <div className="loading">
                <div className="loader"></div>
                <p>Loading your blogs...</p>
              </div>
            ) : sortedBlogs.length === 0 ? (
              <div className="no-blogs">
                <p>You haven't created any blogs yet{filterCategory !== 'All' ? ` in the ${filterCategory} category` : ''}.</p>
                <motion.button 
                  className="btn btn-primary"
                  onClick={() => navigate('/create-blog')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Your First Blog
                </motion.button>
              </div>
            ) : (
              <motion.div 
                className="blogs-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedBlogs.map((blog, index) => (
                  <motion.div 
                    key={blog._id || `blog-${index}`} 
                    className="blog-item"
                    variants={itemVariants}
                    whileHover={{ boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    {blog.coverImage && (
                      <div className="blog-image">
                        <img src={blog.coverImage} alt={blog.title} />
                      </div>
                    )}
                    <div className="blog-info">
                      <h3 className="blog-title">{blog.title || 'Untitled Blog'}</h3>
                      <p className="blog-summary">{blog.summary || 'No summary available'}</p>
                      
                      <div className="blog-tags">
                        {blog.tags && Array.isArray(blog.tags) && blog.tags.map((tag, idx) => (
                          <span key={idx} className="tag">#{tag}</span>
                        ))}
                        {(!blog.tags || !blog.tags.length) && <span className="tag muted">No tags</span>}
                      </div>
                      
                      <div className="blog-meta">
                        <span className="category">
                          <FaTags className="icon" /> {blog.category || 'Uncategorized'}
                        </span>
                        <span className="date">
                          <FaClock className="icon" /> {formatDate(blog.createdAt)}
                        </span>
                        <span className="status">
                          <FaCheckCircle className="icon" /> {blog.status || 'Published'}
                        </span>
                      </div>
                      
                      <div className="blog-stats">
                        <span className="likes">
                          <FaThumbsUp className="icon" /> {Array.isArray(blog.likes) ? blog.likes.length : (blog.likes || 0)}
                        </span>
                        <span className="comments">
                          <FaComment className="icon" /> {blog.comments && Array.isArray(blog.comments) ? blog.comments.length : 0}
                        </span>
                      </div>
                    </div>
                    
                    <div className="blog-actions">
                      <motion.button 
                        className="action-btn view-btn"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEye />
                      </motion.button>
                      <motion.button 
                        className="action-btn edit-btn"
                        onClick={() => navigate(`/edit-blog/${blog._id}`)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button 
                        className="action-btn delete-btn"
                        onClick={() => setConfirmDelete(blog._id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                    
                    {confirmDelete === blog._id && (
                      <div className="delete-confirmation">
                        <p>Are you sure you want to delete this blog?</p>
                        <div className="confirm-actions">
                          <motion.button 
                            className="btn btn-danger"
                            onClick={() => handleDeleteBlog(blog._id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Delete
                          </motion.button>
                          <motion.button 
                            className="btn btn-outline"
                            onClick={() => setConfirmDelete(null)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <h2>Your Blog Analytics</h2>
            
            <div className="analytics-cards">
              <div className="analytics-card">
                <h3>Category Distribution</h3>
                <div className="category-chart">
                  {Object.entries(stats.categoryCounts).map(([category, count], index) => (
                    <div key={index} className="category-bar">
                      <div className="category-name">{category}</div>
                      <div className="category-bar-container">
                        <motion.div 
                          className="category-bar-fill"
                          style={{ 
                            backgroundColor: getColorForCategory(category),
                            width: `${count / stats.totalBlogs * 100}%` 
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${count / stats.totalBlogs * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <span className="category-count">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="analytics-card">
                <h3>Monthly Activity</h3>
                <div className="activity-chart">
                  {Object.entries(stats.monthlyActivity)
                    .sort((a, b) => {
                      const [monthA, yearA] = a[0].split('/');
                      const [monthB, yearB] = b[0].split('/');
                      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
                    })
                    .map(([month, count], index) => (
                      <div key={index} className="activity-bar">
                        <div className="month-name">{formatMonth(month)}</div>
                        <div className="activity-bar-container">
                          <motion.div 
                            className="activity-bar-fill"
                            initial={{ height: 0 }}
                            animate={{ height: `${count * 20}px` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                          <span className="activity-count">{count}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            
            <div className="analytics-summary">
              <h3>Summary</h3>
              <p>You have published a total of {stats.totalBlogs} blogs across {Object.keys(stats.categoryCounts).length} different categories. Your blogs have received {stats.totalLikes} likes and {stats.totalComments} comments.</p>
              {stats.totalBlogs > 0 && (
                <p>Your most popular category is {getMostPopularCategory(stats.categoryCounts)} with {Math.max(...Object.values(stats.categoryCounts))} blogs.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="tab-header">
              <h2>Your Profile</h2>
              <motion.button 
                className="btn btn-primary"
                onClick={() => navigate('/edit-profile')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit className="icon" /> Edit Profile
              </motion.button>
            </div>
            
            <div className="profile-details">
              <div className="detail-group">
                <h3>Personal Information</h3>
                <div className="detail-item">
                  <span className="label">Name:</span>
                  <span className="value">{user?.name || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{user?.email || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Bio:</span>
                  <span className="value">{user?.bio || 'No bio provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Website:</span>
                  <span className="value">
                    {user?.website ? (
                      <a href={user.website} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    ) : 'Not provided'}
                  </span>
                </div>
              </div>
              
              <div className="detail-group">
                <h3>Account Information</h3>
                <div className="detail-item">
                  <span className="label">Account Created:</span>
                  <span className="value">{user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Blogs Published:</span>
                  <span className="value">{stats.totalBlogs}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Engagement:</span>
                  <span className="value">{stats.totalLikes + stats.totalComments} (Likes: {stats.totalLikes}, Comments: {stats.totalComments})</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="modal-actions">
              <motion.button 
                className="btn btn-danger"
                onClick={() => handleDeleteBlog(confirmDelete)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
              <motion.button 
                className="btn btn-outline"
                onClick={() => setConfirmDelete(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Helper functions
const getColorForCategory = (category) => {
  const colors = {
    'Technology': '#4361ee',
    'Science': '#3a0ca3',
    'Mathematics': '#7209b7',
    'Literature': '#f72585',
    'Physics': '#4cc9f0',
    'Computer Science': '#4895ef',
    'Environmental Science': '#52b788',
    'Education': '#ffb703',
    'Web Development': '#fb5607',
    'Psychology': '#ff6b6b',
    'Photography': '#118ab2',
    'History': '#e76f51'
  };
  
  return colors[category] || '#6c757d';
};

const getMostPopularCategory = (categoryCounts) => {
  return Object.entries(categoryCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
};

const formatMonth = (monthYear) => {
  const [month, year] = monthYear.split('/');
  const date = new Date(year, month - 1);
  return date.toLocaleString('default', { month: 'short', year: '2-digit' });
};

export default Dashboard; 