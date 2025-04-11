import { 
  users, 
  blogs, 
  categories,
  findUserById, 
  findBlogById, 
  getUserBlogs, 
  addBlog,
  updateBlogById,
  deleteBlogById,
  addComment,
  toggleLike,
  updateUser
} from './mockData';

// Helper to simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock login function
export const login = async (email, password) => {
  await delay();
  
  // Find user with matching email
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // For demo purposes, accept any password
  if (!user) {
    throw { message: 'User not found with this email' };
  }
  
  // Create a mock token (in real auth this would be a JWT)
  const token = `mock-token-${user._id}-${Date.now()}`;
  
  return { 
    token, 
    user: { ...user, password: undefined } // Remove password from response
  };
};

// Mock register function
export const register = async (userData) => {
  await delay();
  
  // Check if email is already in use
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    throw { message: 'Email already in use' };
  }
  
  // Create new user
  const newUser = {
    _id: `${Number(users[users.length - 1]._id) + 1}`, // Generate new ID
    ...userData,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Create a mock token
  const token = `mock-token-${newUser._id}-${Date.now()}`;
  
  return { 
    token, 
    user: { ...newUser, password: undefined } // Remove password from response
  };
};

// Mock getCurrentUser function
export const getCurrentUser = async () => {
  await delay();
  // In a real app, we'd decode the JWT token to get the user ID
  // For simplicity, we'll just return the first user
  return { ...users[0], password: undefined };
};

// Mock getBlogs function
export const getBlogs = async (queryParams = '') => {
  await delay();
  
  // Always return the blogs array - no need to wrap in an object for this mock
  return blogs;
};

// Mock getBlogById function
export const getBlogById = async (blogId) => {
  await delay();
  
  const blog = findBlogById(blogId);
  
  if (!blog) {
    throw { message: 'Blog not found' };
  }
  
  return blog;
};

// Mock createBlog function
export const createBlog = async (blogData) => {
  await delay();
  
  const newBlog = addBlog(blogData);
  return newBlog;
};

// Mock updateBlog function
export const updateBlog = async (blogId, blogData) => {
  await delay();
  
  const updatedBlog = updateBlogById(blogId, blogData);
  
  if (!updatedBlog) {
    throw { message: 'Blog not found' };
  }
  
  return updatedBlog;
};

// Mock deleteBlog function
export const deleteBlog = async (blogId) => {
  await delay();
  
  const deletedBlog = deleteBlogById(blogId);
  
  if (!deletedBlog) {
    throw { message: 'Blog not found' };
  }
  
  return { message: 'Blog deleted successfully' };
};

// Mock likeBlog function
export const likeBlog = async (blogId) => {
  await delay();
  
  // In a real app, we'd get the user ID from the JWT token
  // For simplicity, we'll use the first user
  const userId = '1';
  
  const updatedBlog = toggleLike(blogId, userId);
  
  if (!updatedBlog) {
    throw { message: 'Blog not found' };
  }
  
  return updatedBlog;
};

// Mock addComment function
export const addCommentToPost = async (blogId, text) => {
  await delay();
  
  // In a real app, we'd get the user ID from the JWT token
  // For simplicity, we'll use the first user
  const userId = '1';
  
  const newComment = addComment(blogId, userId, text);
  
  if (!newComment) {
    throw { message: 'Blog not found' };
  }
  
  return newComment;
};

// Mock getUserProfile function
export const getUserProfile = async (userId) => {
  await delay();
  
  const user = findUserById(userId);
  
  if (!user) {
    throw { message: 'User not found' };
  }
  
  return { ...user, password: undefined };
};

// Mock getUserBlogs function
export const getUserBlogsApi = async (userId) => {
  await delay();
  
  const userBlogs = getUserBlogs(userId);
  // Ensure we always return an array
  return Array.isArray(userBlogs) ? userBlogs : [];
};

// Mock updateProfile function
export const updateProfile = async (userData) => {
  await delay();
  
  // In a real app, we'd get the user ID from the JWT token
  // For simplicity, we'll use the first user
  const userId = '1';
  
  const updatedUser = updateUser(userId, userData);
  
  if (!updatedUser) {
    throw { message: 'User not found' };
  }
  
  return { ...updatedUser, password: undefined };
};

// Mock updatePassword function
export const updatePassword = async (passwordData) => {
  await delay();
  
  // In a real app, we'd verify the current password and update with the new one
  // For this mock, we'll just return success
  return { message: 'Password updated successfully' };
};

// Mock login history for testing UI
export const getLoginHistoryMock = () => {
  // Generate timestamps for the last 5 days
  const timestamps = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    // Set random time of day
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    timestamps.push(date);
  }
  
  // Sort timestamps in descending order
  timestamps.sort((a, b) => b - a);
  
  const mockHistory = timestamps.map(date => ({
    date: date,
    ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/' + (Math.floor(Math.random() * 20) + 80) + '.0'
  }));
  
  return {
    success: true,
    data: {
      lastLogin: timestamps[0],
      loginHistory: mockHistory
    }
  };
};

// Export a default axios-like API object
export default {
  get: async (url) => {
    await delay();
    
    if (url.startsWith('/blogs')) {
      if (url === '/blogs') {
        return { data: blogs };
      }
      
      const id = url.split('/')[2];
      const blog = findBlogById(id);
      
      if (!blog) {
        throw { response: { data: { message: 'Blog not found' } } };
      }
      
      return { data: blog };
    }
    
    if (url.startsWith('/users')) {
      const parts = url.split('/');
      
      if (parts.length === 3) {
        // /users/:id
        const id = parts[2];
        const user = findUserById(id);
        
        if (!user) {
          throw { response: { data: { message: 'User not found' } } };
        }
        
        return { data: { ...user, password: undefined } };
      }
      
      if (parts.length === 4 && parts[3] === 'blogs') {
        // /users/:id/blogs
        const id = parts[2];
        return { data: getUserBlogs(id) };
      }
    }
    
    if (url === '/auth/me') {
      return { data: { ...users[0], password: undefined } };
    }
    
    throw { response: { data: { message: 'Not found' } } };
  },
  
  post: async (url, data) => {
    await delay();
    
    if (url === '/auth/login') {
      const { email, password } = data;
      return login(email, password).then(result => ({ data: result }));
    }
    
    if (url === '/auth/register') {
      return register(data).then(result => ({ data: result }));
    }
    
    if (url === '/blogs') {
      return { data: addBlog(data) };
    }
    
    if (url.includes('/comments')) {
      const blogId = url.split('/')[2];
      const { text } = data;
      const userId = '1'; // Mock user ID
      
      const comment = addComment(blogId, userId, text);
      
      if (!comment) {
        throw { response: { data: { message: 'Blog not found' } } };
      }
      
      return { data: comment };
    }
    
    throw { response: { data: { message: 'Not found' } } };
  },
  
  put: async (url, data) => {
    await delay();
    
    if (url.startsWith('/blogs/')) {
      const parts = url.split('/');
      
      if (parts.length === 3) {
        // /blogs/:id
        const id = parts[2];
        const updatedBlog = updateBlogById(id, data);
        
        if (!updatedBlog) {
          throw { response: { data: { message: 'Blog not found' } } };
        }
        
        return { data: updatedBlog };
      }
      
      if (parts.length === 4 && parts[3] === 'like') {
        // /blogs/:id/like
        const id = parts[2];
        const userId = '1'; // Mock user ID
        
        const blog = toggleLike(id, userId);
        
        if (!blog) {
          throw { response: { data: { message: 'Blog not found' } } };
        }
        
        return { data: blog };
      }
    }
    
    if (url === '/users/profile') {
      const userId = '1'; // Mock user ID
      
      const user = updateUser(userId, data);
      
      if (!user) {
        throw { response: { data: { message: 'User not found' } } };
      }
      
      return { data: { ...user, password: undefined } };
    }
    
    if (url === '/users/updatepassword') {
      return { data: { message: 'Password updated successfully' } };
    }
    
    throw { response: { data: { message: 'Not found' } } };
  },
  
  delete: async (url) => {
    await delay();
    
    if (url.startsWith('/blogs/')) {
      const id = url.split('/')[2];
      
      const deletedBlog = deleteBlogById(id);
      
      if (!deletedBlog) {
        throw { response: { data: { message: 'Blog not found' } } };
      }
      
      return { data: { message: 'Blog deleted successfully' } };
    }
    
    throw { response: { data: { message: 'Not found' } } };
  }
}; 