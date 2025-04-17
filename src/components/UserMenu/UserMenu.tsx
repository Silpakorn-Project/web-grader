import { client } from "@/services";
import { queryClient } from "@/services/query/queryClient";
import { useAuthStore } from "@/store/AuthStore";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import Computer from "@mui/icons-material/Computer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";
import PaletteIcon from "@mui/icons-material/Palette";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    SxProps,
    Typography,
    useColorScheme,
    useTheme
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
    const theme = useTheme();

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

    // Function to determine badge color based on rank
    const getBadgeColor = (rank?: number) => {
        if (!rank) return "default";
        if (rank === 1) return "success";
        if (rank <= 3) return "primary";
        if (rank <= 10) return "secondary";
        return "default";
    };

    if (!user)
        return (
            <Box>
                <Button
                    variant="contained"
                    color={isActive("/login")}
                    onClick={() => {
                        navigate("/login");
                    }}
                    sx={{ borderRadius: 4, px: 3 }}
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
                    cursor: "pointer",
                    bgcolor: "primary.main",
                    width: 40,
                    height: 40,
                    transition: "transform 0.2s",
                    "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: theme.shadows[3],
                    },
                }}
            >
                {user.username[0].toUpperCase()}
            </Avatar>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                sx={{
                    mt: 1,
                    "& .MuiPaper-root": {
                        width: 300,
                        overflow: "visible",
                        borderRadius: 2,
                        mt: 1.5,
                        boxShadow: theme.shadows[4],
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Box position="relative" px={3} py={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 50,
                                height: 50,
                            }}
                        >
                            {user.username[0].toUpperCase()}
                        </Avatar>
                        <Stack>
                            <Typography variant="h6" fontWeight="bold">
                                {user?.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user?.email}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2 }}
                        justifyContent="space-between"
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <EmojiEventsIcon color="primary" />
                            <Typography variant="body2" fontWeight="medium">
                                Score: <strong>{data?.score || 0}</strong>
                            </Typography>
                        </Stack>

                        {data?.rank && (
                            <Chip
                                label={`Rank #${data.rank}`}
                                color={getBadgeColor(data.rank)}
                                size="small"
                                sx={{ fontWeight: "bold" }}
                            />
                        )}
                    </Stack>
                </Box>

                <Divider />

                <MenuItem onClick={handleAppearanceClick} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <PaletteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Appearance" />
                </MenuItem>

                <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
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
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: 2,
                        minWidth: 180,
                        boxShadow: theme.shadows[4],
                    },
                }}
            >
                <MenuItem
                    onClick={() => handleModeChange("system")}
                    sx={{ py: 1.5 }}
                >
                    <ListItemIcon>
                        <Computer fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="System" />
                </MenuItem>
                <MenuItem
                    onClick={() => handleModeChange("light")}
                    sx={{ py: 1.5 }}
                >
                    <ListItemIcon>
                        <Brightness7 fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Light" />
                </MenuItem>
                <MenuItem
                    onClick={() => handleModeChange("dark")}
                    sx={{ py: 1.5 }}
                >
                    <ListItemIcon>
                        <Brightness4 fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Dark" />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
