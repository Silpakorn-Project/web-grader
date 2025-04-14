import { useAuthStore } from "@/store/AuthStore";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

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
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Home
                    </Button>

                    {user && (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/online")}
                                startIcon={<SportsEsportsIcon />}
                            >
                                Online
                            </Button>
                            <Button
                                color="inherit"
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
