import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quizzes/${id}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(-1));
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/quizzes/${id}/submit`, { answers });
      setResults(response.data);
      setShowResults(true);
      
      // Update user progress in context
      if (response.data.userProgress) {
        setUser(prevUser => ({
          ...prevUser,
          progress: response.data.userProgress
        }));
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz');
    }
  };

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

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          Quiz not found
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="space-y-4">
          <p className="text-lg">
            Score: {results.score.toFixed(2)}%
          </p>
          <p className="text-lg">
            Status: {results.passed ? (
              <span className="text-green-500">Passed</span>
            ) : (
              <span className="text-red-500">Failed</span>
            )}
          </p>
          {results.userProgress && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
              <p>Completed Quizzes: {results.userProgress.completedQuizzes}</p>
              <p>Total Score: {results.userProgress.totalScore.toFixed(2)}</p>
              <p>Level: {results.userProgress.level}</p>
            </div>
          )}
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-3 rounded-lg border ${
                answers[currentQuestion] === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg ${
            currentQuestion === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answers.includes(-1)}
            className={`px-4 py-2 rounded-lg ${
              answers.includes(-1)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz; 