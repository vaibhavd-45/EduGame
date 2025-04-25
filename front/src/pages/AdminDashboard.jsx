import React, { useState, useEffect } from 'react';
import api from '../config/axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalQuizzes: 0,
        averageScore: 0,
        totalQuizzesTaken: 0
    });
    const [newQuiz, setNewQuiz] = useState({
        title: '',
        description: '',
        category: 'Programming',
        difficulty: 'Beginner',
        questions: [],
        timeLimit: 30,
        passingScore: 70
    });
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ],
        explanation: '',
        points: 10
    });
    const [error, setError] = useState('');

    const categories = ['Math', 'Science', 'History', 'Literature', 'Programming'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, statsRes, quizzesRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/statistics'),
                api.get('/quizzes')
            ]);
            setUsers(usersRes.data);
            setStatistics(statsRes.data);
            setQuizzes(quizzesRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load admin data');
        }
    };

    const validateQuiz = () => {
        if (!newQuiz.title.trim()) {
            setError('Title is required');
            return false;
        }
        if (!newQuiz.description.trim()) {
            setError('Description is required');
            return false;
        }
        if (newQuiz.questions.length === 0) {
            setError('At least one question is required');
            return false;
        }
        if (!categories.includes(newQuiz.category)) {
            setError('Invalid category');
            return false;
        }
        if (!difficulties.includes(newQuiz.difficulty)) {
            setError('Invalid difficulty');
            return false;
        }
        return true;
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        if (!validateQuiz()) {
            return;
        }
        
        try {
            const response = await api.post('/admin/quizzes', newQuiz);
            console.log('Quiz created:', response.data);
            
            setNewQuiz({
                title: '',
                description: '',
                category: 'Programming',
                difficulty: 'Beginner',
                questions: [],
                timeLimit: 30,
                passingScore: 70
            });
            fetchData();
            setError('');
        } catch (error) {
            console.error('Error creating quiz:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Failed to create quiz');
        }
    };

    const handleQuestionChange = (field, value) => {
        setCurrentQuestion(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleOptionChange = (index, field, value) => {
        setCurrentQuestion(prev => {
            const newOptions = [...prev.options];
            newOptions[index] = {
                ...newOptions[index],
                [field]: value
            };
            return {
                ...prev,
                options: newOptions
            };
        });
    };

    const validateQuestion = () => {
        if (!currentQuestion.question.trim()) {
            setError('Question text is required');
            return false;
        }
        if (!currentQuestion.explanation.trim()) {
            setError('Explanation is required');
            return false;
        }
        if (!currentQuestion.options.some(opt => opt.isCorrect)) {
            setError('At least one correct answer is required');
            return false;
        }
        if (currentQuestion.options.some(opt => !opt.text.trim())) {
            setError('All option texts are required');
            return false;
        }
        return true;
    };

    const addQuestion = () => {
        if (!validateQuestion()) {
            return;
        }
        
        setNewQuiz(prev => ({
            ...prev,
            questions: [...prev.questions, currentQuestion]
        }));
        setCurrentQuestion({
            question: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ],
            explanation: '',
            points: 10
        });
        setError('');
    };

    const handleDeleteQuiz = async (quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                await api.delete(`/admin/quizzes/${quizId}`);
                fetchData();
                setError('');
            } catch (error) {
                console.error('Error deleting quiz:', error);
                setError('Failed to delete quiz');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p className="text-3xl font-bold">{statistics.totalUsers}</p>
                </div>
                <div className="bg-green-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Quizzes</h2>
                    <p className="text-3xl font-bold">{statistics.totalQuizzes}</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Average Score</h2>
                    <p className="text-3xl font-bold">{statistics.averageScore.toFixed(2)}%</p>
                </div>
                <div className="bg-purple-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Quizzes Taken</h2>
                    <p className="text-3xl font-bold">{statistics.totalQuizzesTaken}</p>
                </div>
            </div>

            {/* Quiz List */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold mb-4">Quiz Management</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Limit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passing Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quizzes.map(quiz => (
                                <tr key={quiz._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                            quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.questions.length}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.timeLimit} min</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.passingScore}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteQuiz(quiz._id)}
                                            className="text-red-600 hover:text-red-900 ml-4"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Quiz Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={newQuiz.title}
                                onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={newQuiz.category}
                                onChange={(e) => setNewQuiz({...newQuiz, category: e.target.value})}
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={newQuiz.description}
                            onChange={(e) => setNewQuiz({...newQuiz, description: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Difficulty
                            </label>
                            <select
                                value={newQuiz.difficulty}
                                onChange={(e) => setNewQuiz({...newQuiz, difficulty: e.target.value})}
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            >
                                {difficulties.map(diff => (
                                    <option key={diff} value={diff}>{diff}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time Limit (minutes)
                            </label>
                            <input
                                type="number"
                                value={newQuiz.timeLimit}
                                onChange={(e) => setNewQuiz({...newQuiz, timeLimit: parseInt(e.target.value)})}
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Passing Score (%)
                            </label>
                            <input
                                type="number"
                                value={newQuiz.passingScore}
                                onChange={(e) => setNewQuiz({...newQuiz, passingScore: parseInt(e.target.value)})}
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                    </div>

                    {/* Add Question Section */}
                    <div className="border-t pt-6">
                        <h3 className="text-xl font-bold mb-4">Add Question</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Question Text
                                </label>
                                <input
                                    type="text"
                                    value={currentQuestion.question}
                                    onChange={(e) => handleQuestionChange('question', e.target.value)}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="space-y-4">
                                {currentQuestion.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <input
                                            type="text"
                                            value={option.text}
                                            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                            placeholder={`Option ${index + 1}`}
                                            className="flex-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={option.isCorrect}
                                                onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <span className="text-sm text-gray-600">Correct</span>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Explanation
                                </label>
                                <textarea
                                    value={currentQuestion.explanation}
                                    onChange={(e) => handleQuestionChange('explanation', e.target.value)}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    rows="2"
                                    placeholder="Explain why the correct answer is right"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Points
                                </label>
                                <input
                                    type="number"
                                    value={currentQuestion.points}
                                    onChange={(e) => handleQuestionChange('points', parseInt(e.target.value))}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    min="1"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add Question
                            </button>
                        </div>
                    </div>

                    {/* Added Questions List */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Added Questions ({newQuiz.questions.length})</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {newQuiz.questions.map((q, index) => (
                                <li key={index} className="text-gray-700">{q.question}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={newQuiz.questions.length === 0}
                    >
                        Create Quiz
                    </button>
                </form>
            </div>

            {/* User List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">User Progress</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Quizzes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.progress.completedQuizzes}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.progress.totalScore}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.progress.level}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 