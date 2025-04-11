const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
        trim: true
    },
    summary: {
        type: String,
        required: [true, 'Please provide a summary'],
        maxlength: [200, 'Summary cannot be more than 200 characters']
    },
    coverImage: {
        type: String,
        default: 'default-cover.jpg'
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: [
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
        ]
    },
    tags: {
        type: [String],
        required: true,
        validate: [
            function(val) {
                return val.length <= 5;
            },
            'Cannot add more than 5 tags'
        ]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    buttonExplanations: {
        blueButton: {
            type: String,
            default: "Like Button - Click this blue button to show appreciation for content you find valuable and informative."
        },
        yellowButton: {
            type: String,
            default: "Share Button - Use this yellow button to share content with friends, colleagues, or on social media."
        },
        redButton: {
            type: String,
            default: "Delete Button - This red button is for authors to remove their own content when needed."
        }
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create blog slug from title
BlogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Blog', BlogSchema); 