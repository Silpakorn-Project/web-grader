import router from "@/rounter/rounter";
import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";

type UserMenuProps = {};

const UserMenu: FC<UserMenuProps> = () => {
    const { token } = useAuthStore();
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
        <>
            <IconButton color="inherit" onClick={handleMenuClick}>
                <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
