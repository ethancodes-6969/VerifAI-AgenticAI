import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const useAuth = () => {
    const store = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Convenience wrapper to enforce auth
    const requireAuth = (redirectUrl = "/auth?view=login") => {
        useEffect(() => {
            if (!store.isLoading && !store.isAuthenticated) {
                navigate(redirectUrl, { state: { from: location } });
            }
        }, [store.isAuthenticated, store.isLoading, navigate, redirectUrl, location]);
    };

    return {
        ...store,
        requireAuth
    };
};

export default useAuth;
