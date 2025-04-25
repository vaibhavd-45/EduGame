const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get global leaderboard
router.get('/', auth, async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        
        const users = await User.find()
            .select('username points level badges')
            .sort({ points: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('badges');

        const totalUsers = await User.countDocuments();

        res.json({
            users: users.map((user, index) => ({
                rank: parseInt(skip) + index + 1,
                username: user.username,
                points: user.points,
                level: user.level,
                badges: user.badges
            })),
            totalUsers,
            currentPage: Math.floor(parseInt(skip) / parseInt(limit)) + 1,
            totalPages: Math.ceil(totalUsers / parseInt(limit))
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get subject-wise leaderboard
router.get('/subject/:subject', auth, async (req, res) => {
    try {
        const { subject } = req.params;
        const { limit = 10, skip = 0 } = req.query;

        const users = await User.aggregate([
            {
                $lookup: {
                    from: 'quizzes',
                    localField: 'quizHistory.quiz',
                    foreignField: '_id',
                    as: 'quizDetails'
                }
            },
            {
                $unwind: '$quizDetails'
            },
            {
                $match: {
                    'quizDetails.subject': subject
                }
            },
            {
                $group: {
                    _id: '$_id',
                    username: { $first: '$username' },
                    points: { $sum: '$quizHistory.score' },
                    level: { $first: '$level' },
                    badges: { $first: '$badges' }
                }
            },
            {
                $sort: { points: -1 }
            },
            {
                $skip: parseInt(skip)
            },
            {
                $limit: parseInt(limit)
            }
        ]);

        const totalUsers = await User.countDocuments({
            'quizHistory.quiz': { $exists: true }
        });

        res.json({
            users: users.map((user, index) => ({
                rank: parseInt(skip) + index + 1,
                username: user.username,
                points: user.points,
                level: user.level,
                badges: user.badges
            })),
            totalUsers,
            currentPage: Math.floor(parseInt(skip) / parseInt(limit)) + 1,
            totalPages: Math.ceil(totalUsers / parseInt(limit))
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's rank
router.get('/user-rank/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const rank = await User.countDocuments({
            points: { $gt: user.points }
        }) + 1;

        res.json({
            rank,
            totalUsers: await User.countDocuments()
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 