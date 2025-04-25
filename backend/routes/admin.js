const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users with their scores
router.get('/users', auth, adminAuth, async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .populate('quizHistory.quiz', 'title category');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new quiz
router.post('/quizzes', auth, adminAuth, async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a quiz
router.put('/quizzes/:id', auth, adminAuth, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a quiz
router.delete('/quizzes/:id', auth, adminAuth, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user statistics
router.get('/statistics', auth, adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ isAdmin: false });
        const quizzes = await Quiz.find();
        
        const userStats = await User.aggregate([
            {
                $match: { isAdmin: false }
            },
            {
                $group: {
                    _id: null,
                    avgScore: { $avg: '$progress.totalScore' },
                    totalQuizzesTaken: { $sum: '$progress.completedQuizzes' }
                }
            }
        ]);

        res.json({
            totalUsers,
            totalQuizzes: quizzes.length,
            averageScore: userStats[0]?.avgScore || 0,
            totalQuizzesTaken: userStats[0]?.totalQuizzesTaken || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 