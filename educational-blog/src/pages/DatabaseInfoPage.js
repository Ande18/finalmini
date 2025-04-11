import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDatabase, FaServer, FaUserAlt, FaBook } from 'react-icons/fa';

const DatabaseInfoPage = () => {
  const [dbInfo, setDbInfo] = useState({
    loading: true,
    status: {
      database: { status: 'Loading...', connected: false },
      server: 'Loading...'
    },
    users: {
      count: '...',
      loading: true
    },
    blogs: {
      count: '...',
      loading: true
    }
  });

  useEffect(() => {
    const fetchDbInfo = async () => {
      try {
        // Fetch database status
        const statusRes = await axios.get('/api/status');
        
        setDbInfo(prev => ({
          ...prev,
          loading: false,
          status: statusRes.data
        }));
        
        // If connected, fetch statistics
        if (statusRes.data.database.connected) {
          try {
            // These endpoints would need to be implemented in your backend
            const blogsRes = await axios.get('/api/blogs/count');
            setDbInfo(prev => ({
              ...prev,
              blogs: {
                count: blogsRes.data.count,
                loading: false
              }
            }));
          } catch (error) {
            setDbInfo(prev => ({
              ...prev,
              blogs: {
                count: 'Error',
                loading: false
              }
            }));
          }
          
          try {
            const usersRes = await axios.get('/api/users/count');
            setDbInfo(prev => ({
              ...prev,
              users: {
                count: usersRes.data.count,
                loading: false
              }
            }));
          } catch (error) {
            setDbInfo(prev => ({
              ...prev,
              users: {
                count: 'Error',
                loading: false
              }
            }));
          }
        }
      } catch (error) {
        setDbInfo(prev => ({
          ...prev,
          loading: false,
          status: {
            database: { status: 'Error', connected: false },
            server: 'Error connecting to server'
          }
        }));
      }
    };

    fetchDbInfo();
    
    const interval = setInterval(fetchDbInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (isConnected) => {
    return isConnected ? '#155724' : '#721c24';
  };

  const getStatusBgColor = (isConnected) => {
    return isConnected ? '#d4edda' : '#f8d7da';
  };

  return (
    <div className="db-info-page">
      <h1 style={{ marginBottom: '2rem' }}>Database Connection Status</h1>
      
      <div className="status-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {/* Database Status */}
        <div className="status-card" style={{ 
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: getStatusBgColor(dbInfo.status.database.connected)
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <FaDatabase size={24} color={getStatusColor(dbInfo.status.database.connected)} />
            <h2 style={{ 
              margin: 0,
              color: getStatusColor(dbInfo.status.database.connected) 
            }}>Database</h2>
          </div>
          <p><strong>Status:</strong> {dbInfo.status.database.status}</p>
          <p><strong>Connection:</strong> {dbInfo.status.database.connected ? 'Connected' : 'Disconnected'}</p>
        </div>

        {/* Server Status */}
        <div className="status-card" style={{ 
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#e6f7ff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <FaServer size={24} color="#0070c0" />
            <h2 style={{ margin: 0, color: '#0070c0' }}>Server</h2>
          </div>
          <p><strong>Status:</strong> {dbInfo.status.server}</p>
        </div>

        {/* Data Statistics */}
        <div className="stats-container" style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          flexWrap: 'wrap'
        }}>
          {/* Users Count */}
          <div className="stats-card" style={{ 
            flex: '1',
            minWidth: '200px',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#faf5ff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FaUserAlt size={20} color="#6b46c1" />
              <h3 style={{ margin: 0, color: '#6b46c1' }}>Users</h3>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
              {dbInfo.users.loading ? '...' : dbInfo.users.count}
            </p>
            <p>Total users in database</p>
          </div>

          {/* Blogs Count */}
          <div className="stats-card" style={{ 
            flex: '1',
            minWidth: '200px',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#f0fff4'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <FaBook size={20} color="#2f855a" />
              <h3 style={{ margin: 0, color: '#2f855a' }}>Blogs</h3>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
              {dbInfo.blogs.loading ? '...' : dbInfo.blogs.count}
            </p>
            <p>Total blogs in database</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseInfoPage; 