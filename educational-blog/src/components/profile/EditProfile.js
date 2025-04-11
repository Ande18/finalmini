import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaImage, FaInfoCircle } from 'react-icons/fa';
import { updateProfile, updatePassword, getCurrentUser } from '../../utils/api';
import '../../styles/ProfileEdit.css';

const EditProfile = ({ user, setAuth }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await updateProfile(profileData);
      
      // Update user in local state
      setAuth(localStorage.getItem('token'), response.data);
      
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Error updating profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      await updatePassword({ 
        currentPassword, 
        newPassword 
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccess('Password updated successfully');
    } catch (err) {
      setError(err.message || 'Error updating password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="profile-edit-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="edit-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Edit Profile
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Update your account information
        </motion.p>
      </div>
      
      <div className="edit-tabs">
        <motion.button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUser className="icon" /> Profile
        </motion.button>
        <motion.button 
          className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLock className="icon" /> Password
        </motion.button>
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
      
      {success && (
        <motion.div 
          className="alert alert-success"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {success}
        </motion.div>
      )}
      
      {activeTab === 'profile' && (
        <motion.form 
          className="edit-form profile-form"
          onSubmit={handleProfileSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="icon" /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              Email (cannot be changed)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">
              <FaInfoCircle className="icon" /> Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleProfileChange}
              placeholder="Tell us about yourself"
              rows="4"
              maxLength="200"
            ></textarea>
            <div className="char-count">{profileData.bio.length}/200</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="avatar">
              <FaImage className="icon" /> Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={profileData.avatar}
              onChange={handleProfileChange}
              placeholder="URL to your profile image"
            />
            {profileData.avatar && (
              <div className="avatar-preview">
                <img src={profileData.avatar} alt="Avatar Preview" />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <motion.button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
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
              {loading ? 'Updating...' : 'Update Profile'}
            </motion.button>
          </div>
        </motion.form>
      )}
      
      {activeTab === 'password' && (
        <motion.form 
          className="edit-form password-form"
          onSubmit={handlePasswordSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="form-group">
            <label htmlFor="currentPassword">
              <FaLock className="icon" /> Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">
              <FaLock className="icon" /> New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              minLength="6"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock className="icon" /> Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              minLength="6"
              required
            />
          </div>
          
          <div className="form-actions">
            <motion.button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
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
              {loading ? 'Updating...' : 'Update Password'}
            </motion.button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default EditProfile; 