import { client } from "@/services";
import { queryClient } from "@/services/query/queryClient";
import { useAuthStore } from "@/store/AuthStore";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import Computer from "@mui/icons-material/Computer";
import {
    Avatar,
    Box,
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    SxProps,
    Typography,
    useColorScheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserMenuProps = {
    sx?: SxProps;
};

const UserMenu: FC<UserMenuProps> = () => {
    const navigate = useNavigate();
    const { setMode } = useColorScheme();

    const { user, clearCredentials } = useAuthStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [appearanceAnchorEl, setAppearanceAnchorEl] =
        useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const openAppearanceMenu = Boolean(appearanceAnchorEl);

    const { data } = useQuery({
        queryKey: ["user-ranking"],
        queryFn: async () => {
            if (!user) {
                return null;
            }

            const response =
                await client.graderService.leaderboard.getUserRanking(
                    user.userId
                );
            return response.data;
        },
        enabled: !!user,
    });

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
        queryClient.clear();
        clearCredentials();
        navigate("/login");
    };

    const handleModeChange = (newMode: "light" | "dark" | "system") => {
        setMode(newMode);
        handleCloseAppearanceMenu();
    };

    const isActive = (path: string) =>
        location.pathname === path ? "primary" : "inherit";

    if (!user)
        return (
            <Box>
                <Button
                    color={isActive("/login")}
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </Button>
            </Box>
        );

    return (
        <Box>
            <Avatar
                onClick={handleMenuClick}
                sx={{
                    ml: 1,
                    cursor: "pointer",
                    bgcolor: "primary.main",
                }}
            >
                {user.username[0].toUpperCase()}
            </Avatar>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                sx={{ mt: 1 }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    px={2}
                    py={1}
                >
                    <Avatar
                        onClick={handleMenuClick}
                        sx={{
                            ml: 1,
                            cursor: "pointer",
                            bgcolor: "primary.main",
                        }}
                    >
                        {user.username[0].toUpperCase()}
                    </Avatar>
                    <Stack>
                        <Typography fontWeight="bold">
                            {user?.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user?.email}
                        </Typography>
                        <Typography variant="body2">
                            Your score: {data?.score}{" "}
                        </Typography>
                    </Stack>
                </Stack>
                <Divider />
                <MenuItem onClick={handleAppearanceClick}>
                    <ListItemText primary="Appearance" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                </MenuItem>
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
