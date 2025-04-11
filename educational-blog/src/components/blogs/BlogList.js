import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaThumbsUp, FaComment, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import axios from 'axios';
import { getBlogs } from '../../utils/api';
import BlogItem from './BlogItem';
import '../../styles/BlogList.css';

const BlogList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  // Available categories - expanded list
  const categories = [
    'All', 
    'Technology', 
    'Computer Science',
    'Web Development',
    'Data Science',
    'Artificial Intelligence',
    'Mathematics', 
    'Physics',
    'Chemistry',
    'Biology',
    'Environmental Science',
    'Astronomy',
    'Psychology', 
    'Sociology',
    'Political Science',
    'History', 
    'Geography', 
    'Philosophy', 
    'Languages',
    'Literature',
    'Education',
    'Arts',
    'Music',
    'Photography',
    'Health',
    'Medicine',
    'Nutrition',
    'Sports Science',
    'Business',
    'Economics',
    'Engineering',
    'Agriculture',
    'Other'
  ];

  // Load blogs on component mount
  useEffect(() => {
    loadBlogs();
  }, []);

  // Update category if it's in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      
      const response = await getBlogs();
      
      // Ensure blogs is always an array
      setBlogs(Array.isArray(response) ? response : []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load blogs');
      console.error(err);
      setLoading(false);
    }
  };

  // Filter blogs based on search term and category
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      setFilteredBlogs([]);
      setTotalPages(0);
      return;
    }

    let filtered = [...blogs];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.summary && blog.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredBlogs(filtered);
    setTotalPages(Math.ceil(filtered.length / blogsPerPage));
    setCurrentPage(1); // Reset to first page after filtering
  }, [blogs, searchTerm, selectedCategory, sortOrder, blogsPerPage]);

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogsPage = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h1>Educational Blogs</h1>
        <p>Discover and learn from our collection of educational content</p>
      </div>

      <div className="blog-filter-section">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading blogs...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs found. Try a different search or category.</p>
          {selectedCategory !== 'All' && (
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setSelectedCategory('All');
              }}
            >
              Clear Category Filter
            </button>
          )}
        </div>
      ) : (
        <div className="blog-list">
          {currentBlogsPage.map(blog => (
            <BlogItem key={blog._id} blog={blog} />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-page"
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {[...Array(totalPages).keys()].map(page => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`btn-page ${currentPage === page + 1 ? 'active' : ''}`}
              >
                {page + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList; 