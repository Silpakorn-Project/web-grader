import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Layout from "@/components/Layout/Layout";
import HomePage from "@/modules/homepage/Homepage";
import { LoginRoutes } from "@/modules/login";
import { ProblemsRoutes } from "@/modules/problems";
import { SignupRoutes } from "@/modules/signup";
import { WorkspaceRoutes } from "@/modules/workspace";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorBoundary />,
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
        ],
    },
]);
