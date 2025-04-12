import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import BlogList from './components/blogs/BlogList';
import BlogDetail from './components/blogs/BlogDetail';
import CreateBlog from './components/blogs/CreateBlog';
import EditBlog from './components/blogs/EditBlog';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import DatabaseStatus from './components/layout/DatabaseStatus';
import DatabaseInfoPage from './pages/DatabaseInfoPage';
import DatabaseContent from './pages/DatabaseContent';
import TestDatabasePage from './pages/TestDatabasePage';
import './styles/App.css';
import './styles/DatabaseContent.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Set auth token and user
  const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  // Clear auth token and user
  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    // Check if token is expired
    if (token) {
      // TODO: Add token validation logic if needed
    }
  }, [token]);

  return (
    <div className="app">
      <Navbar user={user} clearAuth={clearAuth} />
      <main className="container">
        <DatabaseStatus />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail user={user} />} />
          <Route path="/dashboard" element={
            <PrivateRoute token={token}>
              <Dashboard user={user} />
            </PrivateRoute>
          } />
          <Route path="/create-blog" element={
            <PrivateRoute token={token}>
              <CreateBlog user={user} />
            </PrivateRoute>
          } />
          <Route path="/edit-blog/:id" element={
            <PrivateRoute token={token}>
              <EditBlog user={user} />
            </PrivateRoute>
          } />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit-profile" element={
            <PrivateRoute token={token}>
              <EditProfile user={user} setAuth={setAuth} />
            </PrivateRoute>
          } />
          <Route path="/db-status" element={<DatabaseInfoPage />} />
          <Route path="/db-content" element={<DatabaseContent />} />
          <Route path="/db-test" element={<TestDatabasePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 