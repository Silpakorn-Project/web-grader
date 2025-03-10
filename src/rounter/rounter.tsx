import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Navbar from "@/components/NavBar/NavBar";
import HomePage from "@/modules/homepage/Homepage";
import { LoginRoutes } from "@/modules/login";
import { ProblemsRoutes } from "@/modules/problems";
import { SignupRoutes } from "@/modules/signup";
import { WorkspaceRoutes } from "@/modules/workspace";
import OnlinePage from "@/pages/OnlinePage";
import { Box } from "@mui/material";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorBoundary />,
        element: <NavbarWrapper />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/online",
                element: <OnlinePage />,
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

function NavbarWrapper() {
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    );
}
