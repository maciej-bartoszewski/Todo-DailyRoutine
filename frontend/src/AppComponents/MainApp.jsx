import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';
import WelcomeComponent from './WelcomeComponent';
import MainComponent from './MainComponent';
import DailyRoutineComponent from './DailyRoutineComponent';
import ListTodoComponent from './ListTodoComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import LogoutComponent from './LogoutComponent';
import AuthProvider from './Security/Auth';
import NewDailyComponent from './NewDailyComponent';
import TodoComponent from './TodoComponent';
import FooterComponent from './FooterComponent';
import ErrorComponent from './ErrorComponent';

import { useAuth } from './Security/Auth';
import './App.css'

function AuthenticatedRoute({children}) {
    const { isAuthenticated } = useAuth();
    
    if(isAuthenticated) return children

    return <Navigate to="/login" />
}

export default function MainApp(){
    return(
        <div className="app">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<MainComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/register" element={<RegisterComponent/>}/>
                        <Route path="/logout" element={<LogoutComponent/>}/>

                        <Route path="/welcome/:username" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>}/>
                        <Route path="/todos/:username" element={
                            <AuthenticatedRoute>
                                <ListTodoComponent/>
                            </AuthenticatedRoute>}/>
                        <Route path="/todos/:username/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>}/>
                        <Route path="/daily/:username" element={
                            <AuthenticatedRoute>
                                <DailyRoutineComponent/>
                            </AuthenticatedRoute>}/>
                        <Route path="/daily/:username/:id" element={
                            <AuthenticatedRoute>
                                <NewDailyComponent/>
                            </AuthenticatedRoute>}/>

                        <Route path="/*" element={<ErrorComponent/>}/>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}