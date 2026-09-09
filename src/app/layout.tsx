'use client'
import {AuthProvider} from '@/app/context/AuthContext';
import {ThemeProvider} from '@/app/context/ThemeContext';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import {useEffect, useState} from 'react';
import './global.css'
import ErrorBoundary from "@/app/components/ErrorBoundary/ErrorBoundary";
import {NotificationProvider} from "@/app/context/NotificationContext";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const [isMockingInitialized, setIsMockingInitialized] = useState(false);

    useEffect(() => {
        const initMocks = async () => {
            try {
                const { startMockingSocial } = await import('@sidekick-monorepo/internship-backend');
                await startMockingSocial();
                console.log('Mocking started successfully');
                setIsMockingInitialized(true);
            } catch (error) {
                console.error('Failed to start mocking:', error);
                setIsMockingInitialized(true);
            }
        };

        initMocks();
    }, []);

    if (!isMockingInitialized) {
        return (
            <html lang="en">
            <body>
            <div>Loading...</div>
            </body>
            </html>
        );
    }

    return (
        <html lang="en">
        <body>
        <ErrorBoundary>
            <NotificationProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <div className="app-container">
                            <Header />
                            <main className="main-content">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </NotificationProvider>
        </ErrorBoundary>
        </body>
        </html>
    );
}