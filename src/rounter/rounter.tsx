// src/router.tsx
import Navbar from "@/components/NavBar/NavBar";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import ProblemsPage from "@/pages/ProblemsPage";
import SignUp from "@/pages/SignUp";
import Workspace from "@/pages/Workspace";
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
        ],
    },
]);

function NavbarWrapper() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default router;
