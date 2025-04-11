const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to the database
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      directConnection: false
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

// Create a test user
const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists:', existingUser);
      return existingUser;
    }
    
    // Create a new test user
    const newUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      bio: 'This is a test user created to verify database connection.'
    });
    
    console.log('Test user created successfully:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
};

// List all users
const listAllUsers = async () => {
  try {
    const users = await User.find({});
    console.log('All users in database:');
    console.log(users);
    console.log(`Total users: ${users.length}`);
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
};

// Main function
const main = async () => {
  try {
    // Connect to the database
    const conn = await connectDB();
    
    // Create a test user
    await createTestUser();
    
    // List all users
    await listAllUsers();
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error in main function:', error);
  }
};

// Run the main function
main(); 