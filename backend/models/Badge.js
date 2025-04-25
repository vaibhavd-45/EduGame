const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['achievement', 'milestone', 'special'],
        default: 'achievement'
    },
    requirements: {
        type: {
            type: String,
            enum: ['points', 'quizzes', 'perfect_score', 'streak'],
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    },
    rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Badge', badgeSchema); 