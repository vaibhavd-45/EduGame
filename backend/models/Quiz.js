const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Math', 'Science', 'History', 'Literature', 'Programming']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: [{
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }],
        explanation: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            default: 10
        }
    }],
    timeLimit: {
        type: Number, // in minutes
        default: 30
    },
    passingScore: {
        type: Number,
        default: 70
    }
}, {
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz; 