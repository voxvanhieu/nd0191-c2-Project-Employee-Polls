import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
            <h1 className="text-6xl font-bold text-primary-600">404</h1>
            <p className="mt-4 text-2xl text-black">Oops! The page you're looking for doesn't exist.</p>
            <button
                onClick={handleBackToHome}
                className="px-6 py-3 mt-6 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
                Back to Home
            </button>
        </div>
    );
};

export { NotFound };
