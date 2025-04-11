import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDatabase, FaUser, FaBlog, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const DatabaseContent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get users
        const usersResponse = await axios.get('http://localhost:5050/api/users/count');
        const usersData = await axios.get('http://localhost:5050/api/status/users');
        if (usersData.data.success) {
          setUsers(usersData.data.users || []);
        }

        // Get blogs
        const blogsResponse = await axios.get('http://localhost:5050/api/blogs/count');
        const blogsData = await axios.get('http://localhost:5050/api/status/blogs');
        if (blogsData.data.success) {
          setBlogs(blogsData.data.blogs || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load database content. Please check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="database-content-loading">
        <FaSpinner className="spinner" />
        <p>Loading database content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="database-content-error">
        <FaExclamationTriangle />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="database-content">
      <h1><FaDatabase /> Database Content</h1>
      
      <div className="content-section">
        <h2><FaUser /> Users</h2>
        {users.length === 0 ? (
          <p>No users found in database</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="content-section">
        <h2><FaBlog /> Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blogs found in database</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th>Likes</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td>{blog._id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author?.name || 'Unknown'}</td>
                  <td>{new Date(blog.createdAt).toLocaleString()}</td>
                  <td>{blog.likes || 0}</td>
                  <td>{blog.comments?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DatabaseContent; 