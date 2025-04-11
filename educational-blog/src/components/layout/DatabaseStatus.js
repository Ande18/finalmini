import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDatabase, FaExclamationTriangle } from 'react-icons/fa';

const DatabaseStatus = () => {
  const [status, setStatus] = useState({
    loading: true,
    connected: false,
    statusText: 'Checking connection...'
  });

  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus({
          loading: false,
          connected: response.data.database.connected,
          statusText: response.data.database.status
        });
      } catch (error) {
        setStatus({
          loading: false,
          connected: false,
          statusText: 'Error connecting to database'
        });
      }
    };

    checkDbStatus();
    
    // Check status every 30 seconds
    const intervalId = setInterval(checkDbStatus, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getStatusStyle = () => {
    if (status.loading) return { backgroundColor: '#f0f0f0' };
    return status.connected 
      ? { backgroundColor: '#d4edda', color: '#155724' } 
      : { backgroundColor: '#f8d7da', color: '#721c24' };
  };

  return (
    <div 
      style={{
        padding: '8px 15px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.85rem',
        marginTop: '10px',
        ...getStatusStyle()
      }}
    >
      {status.connected ? (
        <FaDatabase style={{ color: '#155724' }} />
      ) : (
        <FaExclamationTriangle style={{ color: '#721c24' }} />
      )}
      <span>
        Database: {status.statusText}
      </span>
    </div>
  );
};

export default DatabaseStatus; 