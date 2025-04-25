const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all quizzes
router.get('/', auth, async (req, res) => {
    try {
        const quizzes = await Quiz.find().select('-questions.options.isCorrect');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get quiz by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).select('-questions.options.isCorrect');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit quiz answers
router.post('/:id/submit', auth, async (req, res) => {
    try {
        console.log('Quiz submission started for quiz:', req.params.id);
        console.log('User ID:', req.user.id);
        
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            console.log('Quiz not found:', req.params.id);
            return res.status(404).json({ message: 'Quiz not found' });
        }
        console.log('Quiz found:', quiz.title);

        const { answers } = req.body;
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid answers format' });
        }
        console.log('Received answers:', answers);

        let score = 0;
        let totalPoints = 0;

        // Calculate score
        quiz.questions.forEach((question, index) => {
            totalPoints += question.points;
            const userAnswer = answers[index];
            const correctAnswer = question.options.findIndex(opt => opt.isCorrect);
            
            if (userAnswer === correctAnswer) {
                score += question.points;
            }
        });

        const percentageScore = (score / totalPoints) * 100;
        console.log('Calculated score:', percentageScore);

        // Update user progress
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Current user progress:', user.progress);
        
        // Initialize progress if it doesn't exist
        if (!user.progress) {
            user.progress = {
                completedQuizzes: 0,
                totalScore: 0,
                level: 'Beginner'
            };
        }
        
        // Check if user has already completed this quiz
        const existingQuiz = user.quizHistory.find(h => h.quiz.toString() === quiz._id.toString());
        console.log('Existing quiz attempt:', existingQuiz);
        
        if (existingQuiz) {
            console.log('Updating existing quiz attempt');
            // Update existing quiz score if new score is higher
            if (percentageScore > existingQuiz.score) {
                existingQuiz.score = percentageScore;
                existingQuiz.completedAt = new Date();
                console.log('Updated with better score');
            }
        } else {
            console.log('Adding new quiz attempt');
            // Add new quiz to history
            user.quizHistory.push({
                quiz: quiz._id,
                score: percentageScore,
                completedAt: new Date()
            });
            // Increment completed quizzes count
            console.log('Previous completed quizzes:', user.progress.completedQuizzes);
            user.progress.completedQuizzes = (user.progress.completedQuizzes || 0) + 1;
            console.log('Updated completed quizzes:', user.progress.completedQuizzes);
        }

        // Update total score
        user.progress.totalScore = user.quizHistory.reduce((acc, curr) => acc + curr.score, 0);
        console.log('Updated total score:', user.progress.totalScore);

        // Update level based on average score
        const averageScore = user.progress.totalScore / user.quizHistory.length;
        console.log('Average score:', averageScore);
        
        if (averageScore >= 90) {
            user.progress.level = 'Expert';
        } else if (averageScore >= 75) {
            user.progress.level = 'Advanced';
        } else if (averageScore >= 60) {
            user.progress.level = 'Intermediate';
        } else {
            user.progress.level = 'Beginner';
        }
        console.log('Updated level:', user.progress.level);

        // Use markModified to ensure Mongoose detects the changes
        user.markModified('progress');
        user.markModified('quizHistory');
        
        // Save the changes
        await user.save();
        console.log('User progress saved successfully');

        res.json({
            score: percentageScore,
            totalPoints,
            passed: percentageScore >= quiz.passingScore,
            correctAnswers: quiz.questions.map(q => q.options.findIndex(opt => opt.isCorrect)),
            userProgress: user.progress
        });
    } catch (error) {
        console.error('Quiz submission error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create a new quiz (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update quiz (admin only)
router.put('/:id', adminAuth, async (req, res) => {
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete quiz (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        
        res.json({ message: 'Quiz deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 