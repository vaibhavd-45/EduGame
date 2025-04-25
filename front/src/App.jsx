import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
    <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/quiz/:id" element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            } />
        </Routes>
        </div>
    </div>
    </AuthProvider>
  );
}

export default App; 