import { useAuthStore } from "@/store/AuthStore";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthStore();

    const isActive = (path: string) => (location.pathname === path) ? "primary" : "inherit";

    return (
        <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar>
                <Button color="primary" onClick={() => navigate("/")}>
                    <Typography variant="h4">SU</Typography>
                </Button>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                    }}
                >
                    <Button color={isActive("/")} onClick={() => navigate("/")}>
                        Home
                    </Button>

                    {user && (
                        <>
                            <Button
                                color={isActive("/online")}
                                onClick={() => navigate("/online")}
                                startIcon={<SportsEsportsIcon />}
                            >
                                Online
                            </Button>
                            <Button
                                color={isActive("/problems")}
                                onClick={() => navigate("/problems")}
                            >
                                Problems
                            </Button>
                        </>
                    )}

                    <UserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
