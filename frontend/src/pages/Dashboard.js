import React, { useEffect, useState } from 'react';
import api from '../config/axios';

const Dashboard = () => {
    const [userProgress, setUserProgress] = useState({
        completedQuizzes: 0,
        totalScore: 0,
        level: 'Beginner'
    });

    useEffect(() => {
        const fetchUserProgress = async () => {
            try {
                const response = await api.get('/progress');
                setUserProgress(response.data);
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        };

        fetchUserProgress();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Welcome, {localStorage.getItem('userName')}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Completed Quizzes */}
                <div className="bg-blue-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Completed Quizzes</h2>
                    <p className="text-4xl font-bold mt-2">{userProgress.completedQuizzes}</p>
                </div>

                {/* Total Score */}
                <div className="bg-green-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Total Score</h2>
                    <p className="text-4xl font-bold mt-2">{userProgress.totalScore}</p>
                </div>

                {/* Achievement Level */}
                <div className="bg-purple-100 p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Achievement Level</h2>
                    <p className="text-4xl font-bold mt-2">{userProgress.level}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 