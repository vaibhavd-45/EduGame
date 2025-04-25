import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quizzes and progress in parallel
        const [quizzesRes, progressRes] = await Promise.all([
          api.get('/quizzes'),
          api.get('/progress')
        ]);

        setQuizzes(quizzesRes.data);
        setProgress(progressRes.data.progress);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  // Function to get badge color based on level
  const getLevelBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get badge color based on quiz status
  const getQuizStatusBadge = (quiz) => {
    const completed = progress?.quizHistory?.some(history => 
      history.quiz.toString() === quiz._id.toString()
    );
    const quizHistory = progress?.quizHistory?.find(history => 
      history.quiz.toString() === quiz._id.toString()
    );
    const score = quizHistory?.score;

    if (completed) {
      if (score >= 80) {
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed (Excellent)</span>;
      } else if (score >= 60) {
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed (Good)</span>;
      } else {
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed (Needs Improvement)</span>;
      }
    }
    return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Not Started</span>;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
          <span className={`${getLevelBadgeColor(progress?.level)} text-sm font-medium px-3 py-1 rounded-full`}>
            {progress?.level || 'Beginner'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Completed Quizzes</h3>
            <p className="text-3xl font-bold">{progress?.completedQuizzes || 0}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Total Score</h3>
            <p className="text-3xl font-bold">{progress?.totalScore || 0}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Achievement Level</h3>
            <p className="text-3xl font-bold">{progress?.level || 'Beginner'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{quiz.title}</h3>
                {getQuizStatusBadge(quiz)}
              </div>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </span>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 