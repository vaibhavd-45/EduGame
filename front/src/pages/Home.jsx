import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Educational Gamification</h1>
        <p className="text-xl text-gray-600">
          Learn and grow while having fun with our interactive quizzes!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Interactive Quizzes
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Progress Tracking
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Achievement Levels
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Leaderboard
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <h3 className="font-semibold">Mathematics</h3>
              <p className="text-sm text-gray-600">Basic to advanced math</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold">Science</h3>
              <p className="text-sm text-gray-600">Physics, Chemistry, Biology</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
              <h3 className="font-semibold">Programming</h3>
              <p className="text-sm text-gray-600">Web, Mobile, Desktop</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <h3 className="font-semibold">History</h3>
              <p className="text-sm text-gray-600">World & Regional History</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 