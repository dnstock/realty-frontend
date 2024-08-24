import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        logout();

        // Add a brief delay before redirecting
        const timer = setTimeout(() => {
            navigate('/login');
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [logout, navigate]);

    return <p>Logging out...</p>;
}

export default Logout;
