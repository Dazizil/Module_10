import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
    return (
        <div className={'app-container'}>
            <Header/>
            <main className={'main-content'}>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/signUp'} element={<SignUpPage/>}/>
                    <Route path={'/signIn'} element={<SignInPage/>}/>
                    <Route path={'/profile'} element={<ProfilePage/>}/>
                    <Route path={'/error'} element={<ErrorPage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
