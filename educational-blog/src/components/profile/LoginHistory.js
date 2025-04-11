import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserClock, FaGlobe, FaDesktop } from 'react-icons/fa';
import { getLoginHistory } from '../../utils/api';
import '../../styles/LoginHistory.css';

const LoginHistory = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
  
  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        setLoading(true);
        
        const response = await getLoginHistory();
        
        if (response.success) {
          setLoginHistory(response.data.loginHistory || []);
        } else {
          setError('Could not fetch login history');
        }
      } catch (err) {
        console.error('Error fetching login history:', err);
        setError('Failed to load login history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLoginHistory();
  }, [userId]);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    
    // Format: "Apr 11, 2025, 10:30 AM"
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  if (loading) {
    return (
      <div className="login-history-loading">
        <div className="loader"></div>
        <p>Loading login history...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="login-history-error">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="login-history-container">
      <h2 className="login-history-title">
        <FaUserClock /> Login History
      </h2>
      
      {loginHistory.length === 0 ? (
        <div className="no-login-history">
          <p>No login history available</p>
        </div>
      ) : (
        <motion.div
          className="login-history-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loginHistory.slice().reverse().map((login, index) => (
            <motion.div
              key={index}
              className="login-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="login-date">
                <FaUserClock className="icon" />
                <span>{formatDate(login.date)}</span>
              </div>
              
              <div className="login-details">
                <div>
                  <FaGlobe className="icon" />
                  <span title="IP Address">{login.ipAddress || 'Unknown IP'}</span>
                </div>
                
                <div>
                  <FaDesktop className="icon" />
                  <span title="Browser Info">{login.userAgent || 'Unknown Device'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LoginHistory; 