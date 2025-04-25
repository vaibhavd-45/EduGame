const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    progress: {
        completedQuizzes: {
            type: Number,
            default: 0,
            min: 0
        },
        totalScore: {
            type: Number,
            default: 0,
            min: 0
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
            default: 'Beginner'
        }
    },
    quizHistory: [{
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
            required: true
        },
        score: {
            type: Number,
            required: true,
            min: 0
        },
        completedAt: {
            type: Date,
            default: Date.now,
            required: true
        }
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// Create default admin user if not exists
userSchema.statics.createDefaultAdmin = async function() {
    try {
        const adminExists = await this.findOne({ email: 'vaibhav@gmail.com' });
        if (!adminExists) {
            await this.create({
                name: 'Admin',
                email: 'vaibhav@gmail.com',
                password: 'Vaibhav@123',
                isAdmin: true
            });
            console.log('Default admin user created');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};

const User = mongoose.model('User', userSchema);

// Create default admin when the application starts
User.createDefaultAdmin();

module.exports = User; 