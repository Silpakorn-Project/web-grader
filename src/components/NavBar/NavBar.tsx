import { router } from "@/rounter/rounter";
import { useAuthStore } from "@/store/AuthStore";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
    const { token } = useAuthStore();
    const location = useLocation();

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

                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    SU
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
                    <UserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
