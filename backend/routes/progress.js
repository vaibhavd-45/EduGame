const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Badge = require('../models/Badge');
const { auth } = require('../middleware/auth');

// Get user progress
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('progress quizHistory')
            .populate('quizHistory.quiz', 'title category');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            progress: user.progress,
            quizHistory: user.quizHistory
        });
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user progress
router.put('/', auth, async (req, res) => {
    try {
        const { quizId, score } = req.body;
        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update progress
        user.progress.completedQuizzes += 1;
        user.progress.totalScore += score;

        // Update level based on total score
        if (user.progress.totalScore >= 1000) {
            user.progress.level = 'Expert';
        } else if (user.progress.totalScore >= 500) {
            user.progress.level = 'Advanced';
        } else if (user.progress.totalScore >= 200) {
            user.progress.level = 'Intermediate';
        }

        // Add to quiz history
        user.quizHistory.push({
            quiz: quizId,
            score: score,
            completedAt: new Date()
        });

        await user.save();
        res.json(user.progress);
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user leaderboard position
router.get('/leaderboard', auth, async (req, res) => {
    try {
        const users = await User.find()
            .select('name progress')
            .sort({ 'progress.totalScore': -1 });

        const userPosition = users.findIndex(u => u._id.toString() === req.user.id) + 1;
        const topUsers = users.slice(0, 10).map(user => ({
            name: user.name,
            totalScore: user.progress.totalScore,
            level: user.progress.level
        }));

        res.json({
            userPosition,
            totalUsers: users.length,
            topUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Check and award badges
router.post('/check-badges', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const badges = await Badge.find({ isActive: true });
        const newBadges = [];

        for (const badge of badges) {
            // Skip if user already has this badge
            if (user.badges.includes(badge._id)) continue;

            let earned = false;
            switch (badge.requirements.type) {
                case 'points':
                    earned = user.points >= badge.requirements.value;
                    break;
                case 'quizzes':
                    earned = user.quizHistory.length >= badge.requirements.value;
                    break;
                case 'perfect_score':
                    earned = user.quizHistory.some(attempt => 
                        attempt.score === attempt.quiz.totalPoints
                    );
                    break;
                case 'streak':
                    // Implement streak logic here
                    break;
            }

            if (earned) {
                user.badges.push(badge._id);
                newBadges.push(badge);
            }
        }

        if (newBadges.length > 0) {
            await user.save();
        }

        res.json({
            newBadges,
            totalBadges: user.badges.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 