const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    bio: {
        type: String,
        maxlength: [200, 'Bio cannot be more than 200 characters']
    },
    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    loginHistory: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            ipAddress: {
                type: String
            },
            userAgent: {
                type: String
            }
        }
    ],
    lastLogin: {
        type: Date
    }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
        { id: this._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Record a new login
UserSchema.methods.recordLogin = async function(ipAddress, userAgent) {
    this.loginHistory.push({ 
        date: Date.now(), 
        ipAddress, 
        userAgent 
    });
    
    this.lastLogin = Date.now();
    
    // Keep only the last 10 logins
    if (this.loginHistory.length > 10) {
        this.loginHistory = this.loginHistory.slice(-10);
    }
    
    return this.save();
};

module.exports = mongoose.model('User', UserSchema); 