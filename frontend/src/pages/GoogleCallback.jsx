import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Corrected import
import useAuthStore from '../stores/useAuthStore';
import toast from 'react-hot-toast';

const GoogleCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { googleLogin, fetchMe } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refresh');

        if (token && refreshToken) {
            // Login with tokens
            googleLogin({
                access_token: token,
                refresh_token: refreshToken,
                user: null // Will fetch next
            });

            // Fetch full user details
            fetchMe().then(() => {
                toast.success('Successfully logged in with Google!');
                navigate('/dashboard');
            }).catch(() => {
                toast.error('Failed to fetch user details');
                navigate('/auth?view=login');
            });

        } else {
            toast.error('Google login failed. No tokens received.');
            navigate('/auth?view=login');
        }
    }, [searchParams, googleLogin, fetchMe, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-muted">Processing Google Login...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;
