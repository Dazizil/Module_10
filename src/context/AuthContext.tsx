import React, {createContext, ReactNode, useContext, useState} from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {
    },
    logout: () => {
    },
});

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    let logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}