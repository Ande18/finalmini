import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Welcome to EduBlog</h1>
          <p className="lead">
            Discover, learn, and share educational content across various disciplines
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
          <div className="features">
            <div className="feature">
              <h3>Share Knowledge</h3>
              <p>Create and publish educational content in your area of expertise</p>
            </div>
            <div className="feature">
              <h3>Learn from Experts</h3>
              <p>Access quality educational content from various fields</p>
            </div>
            <div className="feature">
              <h3>Engage & Discuss</h3>
              <p>Comment on posts and engage in intellectual discussions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 