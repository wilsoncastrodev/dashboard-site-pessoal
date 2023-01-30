import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import ErrorPage from '../pages/errors/Error';
import NotFoundPage from '../pages/errors/NotFound';

import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';

import HomePage from '../pages/dashboard/Home';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Navigate to="login" />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'registrar',
                element: <RegisterPage />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '*',
                element: <NotFoundPage />
            },
            {
                path: '',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <HomePage />
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
])

export default Router
