import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import { Brightness4, Brightness7, Computer } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    SxProps,
    useColorScheme,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserMenuProps = {
    sx?: SxProps
};

const UserMenu: FC<UserMenuProps> = ({ sx }) => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const { setMode } = useColorScheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [appearanceAnchorEl, setAppearanceAnchorEl] =
        useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const openAppearanceMenu = Boolean(appearanceAnchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAppearanceClick = (event: React.MouseEvent<HTMLElement>) => {
        setAppearanceAnchorEl(event.currentTarget);
    };

    const handleCloseAppearanceMenu = () => {
        setAppearanceAnchorEl(null);
    };

    const handleLogout = async () => {
        handleCloseMenu();
        await client.graderService.authentication.logout();
        useAuthStore.getState().clearCredentials();
        navigate("/login");
    };

    const handleModeChange = (newMode: "light" | "dark" | "system") => {
        setMode(newMode);
        handleCloseAppearanceMenu();
    };

    if (!token) return null;

    return (
        <Box sx={sx}>
            <IconButton color="inherit" onClick={handleMenuClick}>
                <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleAppearanceClick}>
                    <ListItemText primary="Appearance" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Menu
                anchorEl={appearanceAnchorEl}
                open={openAppearanceMenu}
                onClose={handleCloseAppearanceMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={() => handleModeChange("system")}>
                    <ListItemIcon>
                        <Computer />
                    </ListItemIcon>
                    <ListItemText primary="System" />
                </MenuItem>
                <MenuItem onClick={() => handleModeChange("light")}>
                    <ListItemIcon>
                        <Brightness7 />
                    </ListItemIcon>
                    <ListItemText primary="Light" />
                </MenuItem>
                <MenuItem onClick={() => handleModeChange("dark")}>
                    <ListItemIcon>
                        <Brightness4 />
                    </ListItemIcon>
                    <ListItemText primary="Dark" />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
