import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfileLayout from "../layouts/ProfileLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginProtectedRoute from "../components/auth/LoginProtectedRoute";

import ErrorPage from "../pages/errors/Error";
import NotFoundPage from "../pages/errors/NotFound";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";

import ProfilePage from "../pages/dashboard/profile/Profile";
import CVGeneratePage from "../pages/dashboard/profile/CVGenerate";
import EducationPage from "../pages/dashboard/Education";
import ExperiencePage from "../pages/dashboard/Experience";
import InterestPage from "../pages/dashboard/Interest";
import SourceKnowledgePage from "../pages/dashboard/SourceKnowledge";
import SkillPage from "../pages/dashboard/Skill";
import CategorySkillPage from "../pages/dashboard/CategorySkill";
import KnowledgePage from "../pages/dashboard/Knowledge";
import CategoryKnowledgePage from "../pages/dashboard/CategoryKnowledge";

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
                element: <Navigate to="perfil" />
            },
            {
                path: "perfil",
                element: <ProfileLayout />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: "",
                        element: <ProfilePage />,
                    },
                    {
                        path: "gerador-curriculo",
                        element: <CVGeneratePage />,
                    },
                ]
            },
            {
                path: "educacao",
                element: <EducationPage />,
            },
            {
                path: "experiencias",
                element: <ExperiencePage />,
            },
            {
                path: "interesses",
                element: <InterestPage />,
            },
            {
                path: "fontes-conhecimento",
                element: <SourceKnowledgePage />,
            },
            {
                path: "habilidades",
                element: <SkillPage />,
            },
            {
                path: "categorias/habilidades",
                element: <CategorySkillPage />,
            },
            {
                path: "conhecimentos-complementares",
                element: <KnowledgePage />,
            },
            {
                path: "categorias/conhecimentos-complementares",
                element: <CategoryKnowledgePage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default Router;
