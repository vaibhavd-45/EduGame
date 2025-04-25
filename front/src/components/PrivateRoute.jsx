import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !user.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PrivateRoute; 