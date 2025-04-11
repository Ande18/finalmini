import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <h2>EduBlog</h2>
          <p>Share knowledge, inspire learning</p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/blogs?category=Technology">Technology</Link></li>
              <li><Link to="/blogs?category=Science">Science</Link></li>
              <li><Link to="/blogs?category=Mathematics">Mathematics</Link></li>
              <li><Link to="/blogs?category=Arts">Arts</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Email: contact@edublog.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: 123 Learning St, Knowledge City</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} EduBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 