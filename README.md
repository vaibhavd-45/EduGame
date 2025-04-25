# Quiz Application

A full-stack quiz application with user authentication, quiz management, and progress tracking.

## Features

- User Authentication (Register/Login)
- Admin Dashboard
  - Quiz Management (Create, View, Delete)
  - User Progress Tracking
  - Statistics Overview
- Interactive Quiz Taking
- Progress Tracking
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5001
MONGODB_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=your_jwt_secret_key" > .env

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Navigate to front directory
cd ../front

# Install dependencies
npm install

# Start the frontend application
npm run dev
```

The application will be available at `http://localhost:5173`

## Admin Account Setup

To create an admin account, use the following credentials to register:

```
Username: admin@quizapp.com
Password: Admin@123
```

After registering, you'll need to manually update the user role in MongoDB:

```javascript
// Connect to MongoDB shell and run:
use quiz-app
db.users.updateOne(
  { email: "admin@quizapp.com" },
  { $set: { role: "admin" } }
)
```

## Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## API Routes

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### Quiz Management (Admin Only)
- GET /api/admin/users - Get all users
- GET /api/admin/statistics - Get dashboard statistics
- POST /api/admin/quizzes - Create new quiz
- DELETE /api/admin/quizzes/:id - Delete quiz

### User Routes
- GET /api/quizzes - Get available quizzes
- GET /api/quizzes/:id - Get specific quiz
- POST /api/quizzes/:id/submit - Submit quiz answers

## Tech Stack

- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## License

MIT License 