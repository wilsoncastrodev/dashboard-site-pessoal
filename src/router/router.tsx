import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginProtectedRoute from "../components/auth/LoginProtectedRoute";

import ErrorPage from "../pages/errors/Error";
import NotFoundPage from "../pages/errors/NotFound";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";

import HomePage from "../pages/dashboard/Home";
import ProfilePage from "../pages/dashboard/Profile";

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
            <LoginProtectedRoute>
                <AuthLayout />
            </LoginProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Navigate to="login" />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "registrar",
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "*",
                element: <NotFoundPage />,
            },
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "perfil",
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default Router;
