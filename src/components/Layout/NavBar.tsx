import { useAuthStore } from "@/store/AuthStore";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    color="inherit"
                    onClick={() => navigate("/")}
                >
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
                    <Button
                        color="inherit"
                        onClick={() => navigate(user ? "/online" : "/login")}
                        startIcon={<SportsEsportsIcon />}
                    >
                        Online
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate(user ? "/problems" : "/login")}
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
