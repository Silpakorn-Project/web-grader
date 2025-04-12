import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Layout from "@/components/Layout/Layout";
import { AdminRoutes } from "@/modules/admin";
import { LoginRoutes } from "@/modules/login";
import { ProblemsRoutes } from "@/modules/problems";
import { SignupRoutes } from "@/modules/signup";
import { WorkspaceRoutes } from "@/modules/workspace";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("@/modules/homepage/Homepage"));
const ErrorBoundaryPage = lazy(() => import("@/components/ErrorBoundary/ErrorBoundary"));

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorBoundaryPage />,
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login/*",
                element: <LoginRoutes />,
            },
            {
                path: "/signup/*",
                element: <SignupRoutes />,
            },
            {
                path: "/problems/*",
                element: <ProblemsRoutes />,
            },
            {
                path: "/problems/:id/*",
                element: <WorkspaceRoutes />,
            },
            {
                path: "/admin/*",
                element: <AdminRoutes />,
            },
            {
                path: "/error",
                element: <ErrorBoundary />,
            },
        ],
    },
]);
