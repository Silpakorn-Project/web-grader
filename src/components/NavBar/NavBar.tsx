import router from "@/rounter/rounter";
import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const { token } = useAuthStore();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleCloseMenu();

        await client.graderService.authentication.logout();
        useAuthStore.getState().clearCredentials();
        router.navigate("/login");
    };

    if (location.pathname.startsWith("/problems/")) {
        return null;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SU Grader
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                        color="inherit"
                        onClick={() => router.navigate("/")}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            router.navigate(token ? "/problems" : "/login");
                        }}
                    >
                        Problems
                    </Button>
                    {!token ? (
                        <Button
                            color="inherit"
                            onClick={() => router.navigate("/login")}
                        >
                            Login
                        </Button>
                    ) : (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuClick}
                            >
                                <AccountCircleIcon fontSize="large" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={handleCloseMenu}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
