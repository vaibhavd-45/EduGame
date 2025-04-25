import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'https://edugame.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error);
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default api; 