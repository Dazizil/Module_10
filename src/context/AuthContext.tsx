import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from 'axios';
import {User} from "../types/apiResponse";

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
    const [isAuthorised, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

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
            console.log('Юзер: ', user)
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    async function logout() {
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