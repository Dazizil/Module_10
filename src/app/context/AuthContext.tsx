'use client'
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {User} from '@/app/types/apiResponse';

interface AuthContextType {
    isAuthorised: boolean;
    user: User | null;
    login: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthorised: false,
    user: null,
    login: async () => {
    },
    logout: () => {
    },
});

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthorised, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            try {
                setIsAuthenticated(true);
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
                // Опционально: очистить битые данные
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, []);

    async function login() {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email: 'helena.hills@social.com',
                password: 'password789',
            });

            const {token, user: userData} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setIsAuthenticated(true);
            setUser(userData);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{isAuthorised, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}