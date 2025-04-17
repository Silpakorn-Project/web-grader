import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout: FC = () => {
    const location = useLocation();

    if (
        location.pathname.startsWith("/problems/") ||
        location.pathname.startsWith("/online/play")
    ) {
        return (
            <Box
                component="main"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Outlet />
            </Box>
        );
    }

    return (
        <Box>
            <Navbar />
            <Box
                component="main"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
