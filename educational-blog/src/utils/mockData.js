// Mock data for development

// Users
export const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=4A6BAF&color=fff',
    bio: 'Administrator and educator with 10+ years of experience in online learning.',
    website: 'https://example.com',
    role: 'admin',
    createdAt: '2023-01-15T00:00:00.000Z'
  },
  {
    _id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=5E8B7E&color=fff',
    bio: 'Mathematics teacher specializing in calculus and algebra.',
    website: 'https://janedoe.edu',
    role: 'user',
    createdAt: '2023-01-20T00:00:00.000Z'
  },
  {
    _id: '3',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=A7414A&color=fff',
    bio: 'Science instructor focused on physics and astronomy.',
    website: 'https://johnsmith.org',
    role: 'user',
    createdAt: '2023-02-05T00:00:00.000Z'
  }
];

// Available categories for blogs
export const categories = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Biology',
  'Chemistry',
  'Psychology',
  'Environmental Science',
  'Web Development',
  'Data Science',
  'Artificial Intelligence',
  'Medicine',
  'Business',
  'Economics',
  'History',
  'Geography',
  'Literature',
  'Philosophy',
  'Art',
  'Music',
  'Education',
  'Health',
  'Political Science',
  'Sociology',
  'Engineering',
  'Languages',
  'Sports Science',
  'Photography',
  'Astronomy',
  'Nutrition',
  'Agriculture'
];

// Blogs
export const blogs = [
  {
    _id: '101',
    title: 'Introduction to Machine Learning Concepts',
    content: '<p>Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data. This blog post explains fundamental concepts and algorithms.</p><h2>Supervised Learning</h2><p>Supervised learning involves training a model on labeled data to make predictions or decisions.</p><h2>Unsupervised Learning</h2><p>Unsupervised learning involves finding patterns in unlabeled data.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'An overview of fundamental machine learning concepts for beginners',
    author: '1',
    category: 'Computer Science',
    tags: ['Machine Learning', 'AI', 'Data Science'],
    coverImage: 'https://source.unsplash.com/random/800x600/?machine-learning',
    likes: ['2', '3'],
    comments: [
      {
        _id: '201',
        user: '2',
        text: 'Great introduction! Very helpful for beginners.',
        createdAt: '2023-03-10T10:22:00.000Z'
      },
      {
        _id: '202',
        user: '3',
        text: 'Could you also cover deep learning in a future post?',
        createdAt: '2023-03-11T14:35:00.000Z'
      }
    ],
    createdAt: '2023-03-05T09:30:00.000Z',
    updatedAt: '2023-03-11T14:35:00.000Z'
  },
  {
    _id: '102',
    title: 'The History of Mathematics: From Ancient Times to Modern Era',
    content: '<p>Mathematics has evolved significantly from ancient civilizations to the present day.</p><h2>Ancient Mathematics</h2><p>Early civilizations like Egypt and Babylon developed practical mathematics for surveying and trade.</p><h2>Greek Mathematics</h2><p>The Greeks transformed mathematics into an abstract, deductive system.</p><h2>Modern Mathematics</h2><p>The development of calculus by Newton and Leibniz revolutionized mathematics and science.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'A journey through the history and evolution of mathematical thought',
    author: '2',
    category: 'Mathematics',
    tags: ['History', 'Mathematics', 'Science'],
    coverImage: 'https://source.unsplash.com/random/800x600/?mathematics',
    likes: ['1'],
    comments: [
      {
        _id: '203',
        user: '1',
        text: 'Fascinating overview of mathematical history!',
        createdAt: '2023-03-18T16:42:00.000Z'
      }
    ],
    createdAt: '2023-03-15T13:20:00.000Z',
    updatedAt: '2023-03-18T16:42:00.000Z'
  },
  {
    _id: '103',
    title: 'Understanding Quantum Physics: A Beginner\'s Guide',
    content: '<p>Quantum physics is the branch of physics that deals with the behavior of matter and light on the atomic and subatomic scale.</p><h2>Wave-Particle Duality</h2><p>Quantum entities like electrons can behave as both particles and waves.</p><h2>Uncertainty Principle</h2><p>Heisenberg\'s uncertainty principle states that we cannot simultaneously know both the position and momentum of a particle with perfect precision.</p><h2>Quantum Entanglement</h2><p>Entangled particles remain connected so that actions performed on one affect the other, regardless of distance.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Demystifying the fundamental principles of quantum physics for non-physicists',
    author: '3',
    category: 'Physics',
    tags: ['Quantum Physics', 'Science', 'Physics'],
    coverImage: 'https://source.unsplash.com/random/800x600/?quantum',
    likes: ['1', '2'],
    comments: [
      {
        _id: '204',
        user: '1',
        text: 'This really helped clarify some complex concepts!',
        createdAt: '2023-03-25T09:15:00.000Z'
      },
      {
        _id: '205',
        user: '2',
        text: 'I\'d love to see more examples of quantum phenomena in everyday life.',
        createdAt: '2023-03-26T11:05:00.000Z'
      }
    ],
    createdAt: '2023-03-22T15:45:00.000Z',
    updatedAt: '2023-03-26T11:05:00.000Z'
  },
  {
    _id: '104',
    title: 'Effective Teaching Strategies in Online Education',
    content: '<p>The shift to online education requires adapting traditional teaching methods for virtual environments.</p><h2>Engagement Techniques</h2><p>Building interactive elements into your lessons helps maintain student attention in online settings.</p><h2>Assessment Methods</h2><p>Diversifying assessment types helps measure different aspects of student learning.</p><h2>Technology Integration</h2><p>Leveraging educational technology tools can enhance the learning experience.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Proven strategies for engaging students in virtual learning environments',
    author: '1',
    category: 'Education',
    tags: ['Online Learning', 'Teaching', 'EdTech'],
    coverImage: 'https://source.unsplash.com/random/800x600/?online-education',
    likes: ['2', '3'],
    comments: [
      {
        _id: '206',
        user: '3',
        text: 'I\'ve implemented some of these strategies and seen great results with my students!',
        createdAt: '2023-04-05T14:22:00.000Z'
      }
    ],
    createdAt: '2023-04-01T10:30:00.000Z',
    updatedAt: '2023-04-05T14:22:00.000Z'
  },
  
  // Additional blogs with various categories
  {
    _id: '111',
    title: 'The Fundamentals of Neural Networks and Deep Learning',
    content: '<p>Neural networks are a set of algorithms designed to recognize patterns.</p><h2>Basic Architecture</h2><p>Neural networks consist of layers of interconnected nodes, each with an associated weight and threshold.</p><h2>Backpropagation</h2><p>This is the key algorithm for training neural networks, involving adjusting weights based on error rates.</p><h2>Applications</h2><p>Deep learning is now used in everything from image recognition to language translation.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Understanding the core concepts of neural networks and their implementation in deep learning',
    author: '1',
    category: 'Artificial Intelligence',
    tags: ['Neural Networks', 'Deep Learning', 'AI'],
    coverImage: 'https://source.unsplash.com/random/800x600/?neural-network',
    likes: ['2', '3'],
    comments: [
      {
        _id: '220',
        user: '3',
        text: 'This explanation makes neural networks much clearer to understand!',
        createdAt: '2023-05-10T13:45:00.000Z'
      }
    ],
    createdAt: '2023-05-05T10:30:00.000Z',
    updatedAt: '2023-05-10T13:45:00.000Z'
  },
  {
    _id: '112',
    title: 'Introduction to Sociology: Understanding Human Society',
    content: '<p>Sociology is the scientific study of society, including patterns of social relationships, social interaction, and culture.</p><h2>Social Structures</h2><p>These are the organized patterns of social relationships and social institutions that together constitute society.</p><h2>Social Stratification</h2><p>This refers to the way society is structured into different layers or classes.</p><h2>Current Research</h2><p>Modern sociology examines digital societies, globalization, and climate change impacts.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'An overview of the fundamental principles and concepts of sociology',
    author: '2',
    category: 'Sociology',
    tags: ['Society', 'Social Science', 'Culture'],
    coverImage: 'https://source.unsplash.com/random/800x600/?society',
    likes: ['1'],
    comments: [
      {
        _id: '221',
        user: '1',
        text: 'Great introduction to such a complex field!',
        createdAt: '2023-05-12T09:22:00.000Z'
      }
    ],
    createdAt: '2023-05-08T14:15:00.000Z',
    updatedAt: '2023-05-12T09:22:00.000Z'
  },
  {
    _id: '113',
    title: 'The Science of Nutrition: Understanding Macronutrients and Micronutrients',
    content: '<p>Nutrition is the science that interprets the interaction of nutrients and other substances in food.</p><h2>Macronutrients</h2><p>These include proteins, carbohydrates, and fats - the major sources of energy for the body.</p><h2>Micronutrients</h2><p>Vitamins and minerals are needed in smaller amounts but are essential for various bodily functions.</p><h2>Dietary Guidelines</h2><p>Balancing these nutrients is key to maintaining health and preventing disease.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Understanding the essential nutrients your body needs and how they work',
    author: '3',
    category: 'Nutrition',
    tags: ['Health', 'Diet', 'Wellness'],
    coverImage: 'https://source.unsplash.com/random/800x600/?nutrition',
    likes: ['1', '2'],
    comments: [
      {
        _id: '222',
        user: '2',
        text: 'This helped me understand my dietary needs much better!',
        createdAt: '2023-05-15T11:30:00.000Z'
      }
    ],
    createdAt: '2023-05-10T16:45:00.000Z',
    updatedAt: '2023-05-15T11:30:00.000Z'
  },
  {
    _id: '114',
    title: 'Introduction to Astronomy: Exploring the Cosmos',
    content: '<p>Astronomy is the scientific study of celestial objects and phenomena.</p><h2>The Solar System</h2><p>Our solar system consists of the Sun, eight planets, dwarf planets, moons, asteroids, and comets.</p><h2>Stars and Galaxies</h2><p>Stars are massive, luminous balls of plasma, and galaxies are vast collections of stars.</p><h2>Cosmology</h2><p>This branch of astronomy deals with the origin, evolution, and fate of the universe.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'A beginner\'s guide to understanding the universe and its celestial objects',
    author: '3',
    category: 'Astronomy',
    tags: ['Space', 'Planets', 'Cosmology'],
    coverImage: 'https://source.unsplash.com/random/800x600/?astronomy',
    likes: ['1'],
    comments: [
      {
        _id: '223',
        user: '1',
        text: 'The universe is so fascinating! Thanks for this intro.',
        createdAt: '2023-05-18T14:20:00.000Z'
      }
    ],
    createdAt: '2023-05-15T09:30:00.000Z',
    updatedAt: '2023-05-18T14:20:00.000Z'
  },
  {
    _id: '115',
    title: 'Fundamentals of Economics: Understanding Market Systems',
    content: '<p>Economics is the social science that studies how individuals, businesses, governments, and societies make choices about allocating resources.</p><h2>Microeconomics</h2><p>This branch focuses on individual decisions of households and businesses.</p><h2>Macroeconomics</h2><p>This looks at the economy as a whole, including issues like inflation, unemployment, and economic growth.</p><h2>Economic Systems</h2><p>Different societies organize their economies in various ways, from free markets to command economies.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Understanding the basic principles of economics and how they shape our world',
    author: '2',
    category: 'Economics',
    tags: ['Markets', 'Finance', 'Economy'],
    coverImage: 'https://source.unsplash.com/random/800x600/?economics',
    likes: ['3'],
    comments: [
      {
        _id: '224',
        user: '3',
        text: 'This really clarified some economic concepts I\'ve been struggling with.',
        createdAt: '2023-05-22T10:15:00.000Z'
      }
    ],
    createdAt: '2023-05-20T11:45:00.000Z',
    updatedAt: '2023-05-22T10:15:00.000Z'
  },
  {
    _id: '116',
    title: 'Exploring World Geography: Continents, Countries, and Cultures',
    content: '<p>Geography is the study of places and the relationships between people and their environments.</p><h2>Physical Geography</h2><p>This includes the study of the Earth\'s natural features, such as mountains, rivers, and ecosystems.</p><h2>Human Geography</h2><p>This focuses on how humans interact with their environment and create cultural landscapes.</p><h2>Regional Geography</h2><p>This examines specific regions of the world, integrating both physical and human aspects.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'A comprehensive overview of world geography and its impact on human societies',
    author: '1',
    category: 'Geography',
    tags: ['Earth', 'Culture', 'Environment'],
    coverImage: 'https://source.unsplash.com/random/800x600/?geography',
    likes: ['2', '3'],
    comments: [
      {
        _id: '225',
        user: '2',
        text: 'I learned so much about different regions I didn\'t know before!',
        createdAt: '2023-05-25T15:30:00.000Z'
      }
    ],
    createdAt: '2023-05-23T09:15:00.000Z',
    updatedAt: '2023-05-25T15:30:00.000Z'
  },
  {
    _id: '117',
    title: 'Introduction to Biotechnology: Science, Applications, and Ethics',
    content: '<p>Biotechnology is the use of biological systems, organisms, or derivatives to develop products and technologies.</p><h2>Genetic Engineering</h2><p>This involves manipulating the genetic material of organisms to produce desired traits or products.</p><h2>Medical Applications</h2><p>Biotechnology has revolutionized medicine with new diagnostics, treatments, and vaccines.</p><h2>Ethical Considerations</h2><p>The power of biotechnology raises important ethical questions about its use and regulation.</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Understanding the rapidly evolving field of biotechnology and its impact on society',
    author: '3',
    category: 'Biology',
    tags: ['Genetics', 'Medicine', 'Ethics'],
    coverImage: 'https://source.unsplash.com/random/800x600/?biotechnology',
    likes: ['1'],
    comments: [
      {
        _id: '226',
        user: '1',
        text: 'The ethical questions around this technology are so important to discuss.',
        createdAt: '2023-05-28T13:40:00.000Z'
      }
    ],
    createdAt: '2023-05-26T10:30:00.000Z',
    updatedAt: '2023-05-28T13:40:00.000Z'
  },
  {
    _id: '118',
    title: 'Philosophy of Mind: Consciousness and the Self',
    content: '<p>The philosophy of mind explores the nature of the mind and its relationship to the physical world.</p><h2>The Mind-Body Problem</h2><p>This addresses how mental states relate to physical states, particularly in the brain.</p><h2>Theories of Consciousness</h2><p>Various theories attempt to explain what consciousness is and how it arises.</p><h2>Personal Identity</h2><p>What makes you "you" over time, despite physical and psychological changes?</p><div class="action-buttons-explanation"><div class="blue-button"><span class="button-icon">🔵</span><span class="button-text">Like Button - Click this blue button to show appreciation for content you find valuable and informative.</span></div><div class="yellow-button"><span class="button-icon">🟡</span><span class="button-text">Share Button - Use this yellow button to share content with friends, colleagues, or on social media.</span></div><div class="red-button"><span class="button-icon">🔴</span><span class="button-text">Delete Button - This red button is for authors to remove their own content when needed.</span></div></div>',
    summary: 'Exploring philosophical questions about consciousness, identity, and the nature of mind',
    author: '2',
    category: 'Philosophy',
    tags: ['Consciousness', 'Mind', 'Identity'],
    coverImage: 'https://source.unsplash.com/random/800x600/?philosophy',
    likes: ['1', '3'],
    comments: [
      {
        _id: '227',
        user: '3',
        text: 'These are the questions that keep me up at night. Fascinating piece!',
        createdAt: '2023-05-30T14:15:00.000Z'
      }
    ],
    createdAt: '2023-05-28T12:00:00.000Z',
    updatedAt: '2023-05-30T14:15:00.000Z'
  }
];

// Helper functions

export const findUserById = (id) => users.find(user => user._id === id);

export const findBlogById = (id) => blogs.find(blog => blog._id === id);

export const getUserBlogs = (userId) => blogs.filter(blog => blog.author === userId);

export const addBlog = (blog) => {
  const newBlog = {
    _id: `${Number(blogs[blogs.length - 1]._id) + 1}`,
    ...blog,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: [],
    comments: []
  };
  
  blogs.push(newBlog);
  return newBlog;
};

export const updateBlogById = (id, updates) => {
  const index = blogs.findIndex(blog => blog._id === id);
  
  if (index === -1) return null;
  
  blogs[index] = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return blogs[index];
};

export const deleteBlogById = (id) => {
  const index = blogs.findIndex(blog => blog._id === id);
  
  if (index === -1) return null;
  
  const deletedBlog = blogs[index];
  blogs.splice(index, 1);
  
  return deletedBlog;
};

export const addComment = (blogId, userId, text) => {
  const blog = findBlogById(blogId);
  
  if (!blog) return null;
  
  const newComment = {
    _id: `${Date.now()}`,
    user: userId,
    text,
    createdAt: new Date().toISOString()
  };
  
  if (!blog.comments) {
    blog.comments = [];
  }
  
  blog.comments.push(newComment);
  blog.updatedAt = new Date().toISOString();
  
  return blog;
};

export const toggleLike = (blogId, userId) => {
  const blog = findBlogById(blogId);
  
  if (!blog) return null;
  
  if (!blog.likes) {
    blog.likes = [];
  }
  
  const index = blog.likes.indexOf(userId);
  
  if (index === -1) {
    // Add like
    blog.likes.push(userId);
  } else {
    // Remove like
    blog.likes.splice(index, 1);
  }
  
  blog.updatedAt = new Date().toISOString();
  
  return blog;
};

export const updateUser = (userId, updates) => {
  const index = users.findIndex(user => user._id === userId);
  
  if (index === -1) return null;
  
  users[index] = {
    ...users[index],
    ...updates
  };
  
  return users[index];
}; 