# Educational Gamification App

A full-stack web application that combines education with gamification elements to make learning more engaging and competitive.

## Tech Stack

### Frontend
- React.js
- TailwindCSS
- Framer Motion (for animations)
- Chart.js/Recharts (for data visualization)
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (for authentication)
- bcrypt (for password hashing)

## Project Structure

```
educational-gamification/
├── frontend/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/          # Page components
│       ├── context/        # React context
│       ├── services/       # API services
│       └── utils/          # Utility functions
│
└── backend/                 # Node.js backend
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    └── utils/              # Utility functions
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start development server: `npm start`

## Features
- Interactive quizzes with real-time feedback
- Badge and reward system
- Leaderboards and progress tracking
- AI-powered quiz recommendations
- User authentication and authorization
- Mobile-responsive design

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Quizzes
- GET /api/quizzes
- GET /api/quizzes/:id
- POST /api/quizzes
- PUT /api/quizzes/:id
- DELETE /api/quizzes/:id

### User Progress
- GET /api/progress/:userId
- GET /api/leaderboard
- GET /api/badges/:userId

### Quiz Recommendations
- GET /api/recommendations/:userId 