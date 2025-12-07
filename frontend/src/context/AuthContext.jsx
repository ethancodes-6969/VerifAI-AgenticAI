import React, { createContext, useEffect } from 'react';
import useAuthStore from '../hooks/useAuth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { fetchUser, token } = useAuthStore();

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token, fetchUser]);

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};
