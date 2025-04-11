import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDatabase, FaUser, FaSpinner } from 'react-icons/fa';

const TestDatabasePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testUser, setTestUser] = useState(null);
  const [testUserId, setTestUserId] = useState('');

  // Test user creation
  const handleCreateTestUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:5050/api/auth/test-create-user');
      console.log('Test user response:', response.data);
      setTestUser(response.data.user);
    } catch (error) {
      console.error('Error creating test user:', error);
      setError('Failed to create test user: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test login history
  const handleAddLoginHistory = async (e) => {
    e.preventDefault();
    
    if (!testUserId.trim()) {
      setError('Please enter a user ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5050/api/auth/test-login-record/${testUserId}`);
      console.log('Login history response:', response.data);
      setTestUser(response.data.user);
    } catch (error) {
      console.error('Error adding login history:', error);
      setError('Failed to add login history: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <FaDatabase style={{ marginRight: '10px' }} /> MongoDB Connection Test
      </h1>
      
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '10px' }} />
          <span>Loading...</span>
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={handleCreateTestUser}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          Create Test User
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            value={testUserId}
            onChange={(e) => setTestUserId(e.target.value)}
            placeholder="Enter User ID"
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '10px'
            }}
          />
          
          <button 
            onClick={handleAddLoginHistory}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            Add Login History
          </button>
        </div>
      </div>
      
      {testUser && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <FaUser style={{ marginRight: '10px' }} /> User Data
          </h2>
          
          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(testUser, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDatabasePage; 