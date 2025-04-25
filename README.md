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

## Local Setup Instructions

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

## Deployment Instructions

### Backend Deployment (Railway/Heroku)

1. **Prepare Backend for Deployment**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install production dependencies
   npm install --production
   
   # Create Procfile for Heroku
   echo "web: node server.js" > Procfile
   ```

2. **Environment Variables Setup**
   Set the following environment variables in your deployment platform:
   ```
   PORT=5001
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_jwt_secret
   NODE_ENV=production
   ```

3. **MongoDB Atlas Setup**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Replace `<username>`, `<password>`, and `<dbname>` in the connection string
   - Add connection string to your environment variables

4. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login to Railway
   railway login

   # Initialize Railway project
   railway init

   # Deploy
   railway up
   ```

   OR

   **Deploy to Heroku**
   ```bash
   # Install Heroku CLI
   npm install -g heroku

   # Login to Heroku
   heroku login

   # Create Heroku app
   heroku create your-app-name

   # Set environment variables
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_production_jwt_secret
   heroku config:set NODE_ENV=production

   # Deploy to Heroku
   git push heroku main
   ```

5. **Verify Deployment**
   - Check if the server is running: `https://your-app-name.up.railway.app` or `https://your-app-name.herokuapp.com`
   - Test the API endpoints using Postman or similar tool
   - Monitor logs for any errors

### Production Considerations

1. **Security**
   - Enable CORS with specific origins
   - Set secure HTTP headers
   - Use HTTPS
   - Implement rate limiting
   - Add request validation

2. **Performance**
   - Enable compression
   - Implement caching
   - Use clustering for better performance
   - Add monitoring and logging

3. **Database**
   - Use connection pooling
   - Set up database indexing
   - Configure automatic backups
   - Monitor database performance

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
NODE_ENV=development
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