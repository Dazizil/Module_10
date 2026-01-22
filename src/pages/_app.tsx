import type {AppProps} from 'next/app';
import {AuthProvider} from '@/context/AuthContext';
import {ThemeProvider} from '@/context/ThemeContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import {useEffect, useState} from 'react';
import '../global.css'

export default function App({ Component, pageProps }: AppProps) {
    const [isMockingInitialized, setIsMockingInitialized] = useState(false);

    useEffect(() => {
        const initMocks = async () => {
            try {
                const { startMockingSocial } =
                    await import('@sidekick-monorepo/internship-backend');
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
        return <></>;
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <div className="app-container">
                    <Header />
                    <main className="main-content">
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
}