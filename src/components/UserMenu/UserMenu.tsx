import router from "@/rounter/rounter";
import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import { useThemeStore } from "@/store/ThemeStore"; // Import the theme store
import { Brightness4, Brightness7 } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import { FC, useState } from "react";

type UserMenuProps = {};

const UserMenu: FC<UserMenuProps> = () => {
    const { token } = useAuthStore();
    const { mode, toggleMode } = useThemeStore();
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

    if (!token) return null;

    return (
        <Box>
            <IconButton color="inherit" onClick={handleMenuClick}>
                <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={toggleMode}>
                    <ListItemIcon>
                        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </ListItemIcon>
                    <ListItemText
                        primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
                    />
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
