import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaClock, FaBlog, FaThumbsUp, FaComment, FaCalendarAlt, FaEdit, FaUserClock } from 'react-icons/fa';
import { getUserProfile, getUserBlogs } from '../../utils/api';
import LoginHistory from './LoginHistory';
import '../../styles/Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('blogs');
  
  // Check if this is the current user's profile
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const isCurrentUser = currentUser._id === id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const profileResponse = await getUserProfile(id);
        setUserProfile(profileResponse.data);
        
        // Fetch user blogs
        const blogsResponse = await getUserBlogs(id);
        setUserBlogs(blogsResponse.data);
      } catch (err) {
        setError('Error loading user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="profile-container loading-container">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="profile-container error-container">
        <h2>Error</h2>
        <p>{error || 'User not found'}</p>
        <Link to="/blogs" className="btn btn-primary">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const totalLikes = userBlogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);
  const totalComments = userBlogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header">
        <motion.div 
          className="profile-avatar"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={userProfile.avatar || 'https://via.placeholder.com/150'} 
            alt={userProfile.name} 
          />
        </motion.div>
        
        <motion.div 
          className="profile-info"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1>{userProfile.name}</h1>
          {userProfile.bio && <p className="bio">{userProfile.bio}</p>}
          
          <div className="profile-meta">
            <div className="meta-item">
              <FaUser className="icon" />
              <span>{userProfile.role || 'User'}</span>
            </div>
            <div className="meta-item">
              <FaClock className="icon" />
              <span>Joined: {formatDate(userProfile.createdAt)}</span>
            </div>
            <div className="meta-item">
              <FaBlog className="icon" />
              <span>{userBlogs.length} Blogs</span>
            </div>
            {userProfile.lastLogin && (
              <div className="meta-item">
                <FaUserClock className="icon" />
                <span>Last Login: {formatDate(userProfile.lastLogin)}</span>
              </div>
            )}
          </div>
          
            <Link to="/edit-profile" className="btn btn-outline mt-3">
              <FaEdit /> Edit Profile
            </Link>
        </motion.div>
      </div>
      
      <div className="profile-stats">
        <motion.div 
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <FaBlog className="stat-icon" />
          <div className="stat-info">
            <h3>{userBlogs.length}</h3>
            <p>Blogs Published</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <FaThumbsUp className="stat-icon" />
          <div className="stat-info">
            <h3>{totalLikes}</h3>
            <p>Total Likes</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <FaComment className="stat-icon" />
          <div className="stat-info">
            <h3>{totalComments}</h3>
            <p>Total Comments</p>
          </div>
        </motion.div>
      </div>
      
      <div className="profile-tabs">
        <motion.button 
          className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBlog className="icon" /> Blogs
        </motion.button>
        
        {isCurrentUser && (
          <motion.button 
            className={`tab-btn ${activeTab === 'login-history' ? 'active' : ''}`}
            onClick={() => setActiveTab('login-history')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUserClock className="icon" /> Login History
          </motion.button>
        )}
      </div>
      
      <div className="profile-content">
        {activeTab === 'blogs' && (
          <div className="blogs-tab">
            <h2>{userProfile.name}'s Blogs</h2>
            
            {userBlogs.length === 0 ? (
              <div className="no-blogs">
                <p>This user hasn't published any blogs yet.</p>
              </div>
            ) : (
              <motion.div 
                className="profile-blogs-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {userBlogs.map(blog => (
                  <motion.div 
                    key={blog._id} 
                    className="profile-blog-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  >
                    <h3>
                      <Link to={`/blogs/${blog._id}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    
                    <p>{blog.description}</p>
                    
                    <div className="blog-meta">
                      <div className="meta-item">
                        <FaCalendarAlt className="icon" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="meta-item">
                        <FaThumbsUp className="icon" />
                        <span>{blog.likes || 0} Likes</span>
                      </div>
                      <div className="meta-item">
                        <FaComment className="icon" />
                        <span>{blog.comments?.length || 0} Comments</span>
                      </div>
                    </div>
                    
                    <Link to={`/blogs/${blog._id}`} className="btn btn-primary btn-sm">
                      Read More
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
        
        {activeTab === 'login-history' && isCurrentUser && (
          <LoginHistory userId={id} />
        )}
      </div>
    </motion.div>
  );
};

export default Profile; 