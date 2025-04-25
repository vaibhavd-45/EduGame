const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const { auth } = require('../middleware/auth');

// Get personalized quiz recommendations
router.get('/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('quizHistory.quiz', 'subject difficulty');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Analyze user's performance
        const subjectPerformance = {};
        user.quizHistory.forEach(attempt => {
            const subject = attempt.quiz.subject;
            if (!subjectPerformance[subject]) {
                subjectPerformance[subject] = {
                    totalAttempts: 0,
                    totalScore: 0,
                    averageScore: 0
                };
            }
            subjectPerformance[subject].totalAttempts++;
            subjectPerformance[subject].totalScore += attempt.score;
            subjectPerformance[subject].averageScore = 
                subjectPerformance[subject].totalScore / subjectPerformance[subject].totalAttempts;
        });

        // Get recommended subjects (focus on weaker areas)
        const recommendedSubjects = Object.entries(subjectPerformance)
            .sort((a, b) => a[1].averageScore - b[1].averageScore)
            .slice(0, 3)
            .map(([subject]) => subject);

        // Get recommended difficulty level
        const averageScore = Object.values(subjectPerformance)
            .reduce((sum, perf) => sum + perf.averageScore, 0) / 
            Object.keys(subjectPerformance).length;

        let recommendedDifficulty = 'medium';
        if (averageScore > 80) {
            recommendedDifficulty = 'hard';
        } else if (averageScore < 40) {
            recommendedDifficulty = 'easy';
        }

        // Get recommended quizzes
        const recommendedQuizzes = await Quiz.find({
            subject: { $in: recommendedSubjects },
            difficulty: recommendedDifficulty,
            isActive: true,
            _id: { $nin: user.quizHistory.map(attempt => attempt.quiz._id) }
        })
        .select('-questions.correctAnswer')
        .limit(5);

        // Get trending quizzes (most attempted)
        const trendingQuizzes = await Quiz.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'quizHistory.quiz',
                    as: 'attempts'
                }
            },
            {
                $project: {
                    title: 1,
                    subject: 1,
                    difficulty: 1,
                    totalPoints: 1,
                    attemptCount: { $size: '$attempts' }
                }
            },
            {
                $sort: { attemptCount: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.json({
            recommendedQuizzes,
            trendingQuizzes,
            subjectPerformance,
            recommendedSubjects,
            recommendedDifficulty
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 