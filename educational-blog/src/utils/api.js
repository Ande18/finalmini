import axios from 'axios';
import { 
  login as mockLogin,
  register as mockRegister,
  getBlogs as mockGetBlogs,
  getBlogById as mockGetBlogById,
  createBlog as mockCreateBlog,
  updateBlog as mockUpdateBlog,
  deleteBlog as mockDeleteBlog,
  likeBlog as mockLikeBlog,
  addCommentToPost as mockAddComment,
  getUserProfile as mockGetUserProfile,
  getUserBlogsApi as mockGetUserBlogs,
  updateProfile as mockUpdateProfile,
  getLoginHistoryMock
} from './mockApi';

// API Base URL - set up for different environments
const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
  ? 'https://edublog-api.onrender.com/api' // Change this to your deployed backend URL
  : 'http://localhost:5050/api');

// Use mock data in development when no MongoDB is available
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || false;

// Add token to requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth
export const login = async (email, password) => {
  if (USE_MOCK_DATA) {
    return mockLogin(email, password);
  }
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    setAuthToken(response.data.token);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Server error' };
  }
};

export const register = async (userData) => {
  if (USE_MOCK_DATA) {
    return mockRegister(userData);
  }
  
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    setAuthToken(response.data.token);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Server error' };
  }
};

// Blogs
export const getBlogs = async () => {
  if (USE_MOCK_DATA) {
    return mockGetBlogs();
  }
  
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch blogs' };
  }
};

export const getBlogById = async (id) => {
  if (USE_MOCK_DATA) {
    return mockGetBlogById(id);
  }
  
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch blog' };
  }
};

export const createBlog = async (blogData) => {
  if (USE_MOCK_DATA) {
    return mockCreateBlog(blogData);
  }
  
  try {
    const response = await axios.post(`${API_URL}/blogs`, blogData);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to create blog' };
  }
};

export const updateBlog = async (id, blogData) => {
  if (USE_MOCK_DATA) {
    return mockUpdateBlog(id, blogData);
  }
  
  try {
    const response = await axios.put(`${API_URL}/blogs/${id}`, blogData);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update blog' };
  }
};

export const deleteBlog = async (id) => {
  if (USE_MOCK_DATA) {
    return mockDeleteBlog(id);
  }
  
  try {
    await axios.delete(`${API_URL}/blogs/${id}`);
    return { success: true };
  } catch (err) {
    throw err.response?.data || { message: 'Failed to delete blog' };
  }
};

export const likeBlog = async (id) => {
  if (USE_MOCK_DATA) {
    return mockLikeBlog(id);
  }
  
  try {
    const response = await axios.put(`${API_URL}/blogs/${id}/like`);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to like blog' };
  }
};

export const addComment = async (id, text) => {
  if (USE_MOCK_DATA) {
    return mockAddComment(id, text);
  }
  
  try {
    const response = await axios.post(`${API_URL}/blogs/${id}/comments`, { text });
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to add comment' };
  }
};

// User
export const getUserProfile = async (id) => {
  if (USE_MOCK_DATA) {
    return mockGetUserProfile(id);
  }
  
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch user profile' };
  }
};

export const getUserBlogs = async (id) => {
  if (USE_MOCK_DATA) {
    return mockGetUserBlogs(id);
  }
  
  try {
    const response = await axios.get(`${API_URL}/users/${id}/blogs`);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch user blogs' };
  }
};

export const updateProfile = async (userData) => {
  if (USE_MOCK_DATA) {
    return mockUpdateProfile(userData);
  }
  
  try {
    const response = await axios.put(`${API_URL}/users/me`, userData);
    return response.data.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update profile' };
  }
};

export const updatePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/users/me/password`, passwordData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update password' };
  }
};

export const getLoginHistory = async () => {
  if (USE_MOCK_DATA) {
    return getLoginHistoryMock();
  }
  
  try {
    const response = await axios.get(`${API_URL}/auth/login-history`);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch login history' };
  }
}; 