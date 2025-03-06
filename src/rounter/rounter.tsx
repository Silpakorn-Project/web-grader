import Navbar from "@/components/NavBar/NavBar";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound"; // Import the 404 page
import ProblemsPage from "@/pages/ProblemsPage";
import SignUp from "@/pages/SignUp";
import Workspace from "@/pages/Workspace";
import { Box } from "@mui/material";
import { createBrowserRouter, Outlet } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarWrapper />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/problems",
                element: <ProblemsPage />,
            },
            {
                path: "/problems/:id",
                element: <Workspace />,
            },
            {
                path: "*",
                element: <NotFound />,
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

export default router;
