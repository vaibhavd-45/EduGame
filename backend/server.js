const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const adminRoutes = require('./routes/admin');
const progressRoutes = require('./routes/progress');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: ['https://edu-game-teal.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Performance Middleware
app.use(compression());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/progress', progressRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: Object.values(err.errors).map(e => e.message)
        });
    }
    
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
    
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token expired'
        });
    }
    
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message
    });
});

// 404 Handler
app.use((req, res) => {
    console.log('404 Not Found:', req.method, req.url);
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
}); 