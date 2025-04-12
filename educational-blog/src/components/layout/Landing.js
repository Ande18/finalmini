import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../utils/api';
import '../../styles/Landing.css';

const Landing = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await getBlogs();
        // Get 3 random blogs to feature
        const randomBlogs = [...blogs]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setFeaturedBlogs(randomBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

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
          
          {/* Featured Blogs Section */}
          <div className="featured-blogs-section">
            <h2>Featured Articles</h2>
            {loading ? (
              <p>Loading featured content...</p>
            ) : (
              <div className="featured-blogs">
                {featuredBlogs.map(blog => (
                  <div key={blog._id} className="featured-blog-card">
                    <div 
                      className="featured-blog-image" 
                      style={{ backgroundImage: `url(${blog.coverImage})` }}
                    ></div>
                    <div className="featured-blog-content">
                      <span className="featured-blog-category">{blog.category}</span>
                      <h3>{blog.title}</h3>
                      <p>{blog.summary}</p>
                      <Link to={`/blogs/${blog._id}`} className="read-more">
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="view-all-blogs">
              <Link to="/blogs" className="btn btn-outline">
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 