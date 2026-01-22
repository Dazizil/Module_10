import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Theme, ThemeContextType} from '../types/contextTypes/ThemeContextTypes';

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        const userTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';

        setTheme(userTheme);
        document.documentElement.className = userTheme;
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.className = newTheme;
    };

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}