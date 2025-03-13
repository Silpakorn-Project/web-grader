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
import { useNavigate } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

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
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            navigate(user ? "/problems" : "/login");
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
