const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const statusRoutes = require('./routes/status');

// Config
dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://edublog-frontend.netlify.app', 'http://localhost:3000']
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased timeout to 30 seconds
      directConnection: false
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    // Don't crash the server on connection error
    console.log("Using mock data since MongoDB connection failed");
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Educational Blog API');
});

// Database status check endpoint
app.get('/api/status', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  let status;
  
  switch(dbStatus) {
    case 0: status = "Disconnected"; break;
    case 1: status = "Connected"; break;
    case 2: status = "Connecting"; break;
    case 3: status = "Disconnecting"; break;
    default: status = "Unknown";
  }
  
  res.json({
    success: true,
    database: {
      status: status,
      connected: dbStatus === 1
    },
    server: "Running"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ 
    success: false,
    message: err.message || 'Something went wrong!' 
  });
});

// Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 