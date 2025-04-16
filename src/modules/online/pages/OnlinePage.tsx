import { useAuthStore } from "@/store/AuthStore";
import { useSocketStore } from "@/store/SocketStore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid2,
    LinearProgress,
    Paper,
    Skeleton,
    Tooltip,
    Typography
} from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const OnlinePage: FC = () => {
    const {
        isConnected,
        room,
        countdown,
        serverTime,
        redirectToHome,
        redirectToPlayOnline,
        connectSocket,
        handleLeaveGame,
        resetRedirectToHome,
        resetRedirectToPlayOnline,
    } = useSocketStore();
    const { user } = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        connectSocket(user?.userId || -1, user?.username || "null");
        return () => {};
    }, []);

    useEffect(() => {
        if (redirectToHome) {
            navigate("/");
            resetRedirectToHome();
        }

        if (redirectToPlayOnline) {
            navigate("/online/play");
            resetRedirectToPlayOnline();
        }
    }, [redirectToHome, redirectToPlayOnline]);

    return (
        <Box
            sx={{
                p: 4,
                maxWidth: "1400px",
                mx: "auto",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 4,
                    gap: 2,
                }}
            >
                <Chip
                    icon={
                        isConnected ? (
                            <CheckCircleIcon color="success" />
                        ) : (
                            <CancelIcon color="error" />
                        )
                    }
                    label={isConnected ? "Connected" : "Disconnected"}
                    color={isConnected ? "success" : "error"}
                    variant="outlined"
                />
                <Chip
                    icon={<AccessTimeIcon />}
                    label={serverTime}
                    variant="outlined"
                />
            </Box>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography
                        variant="h3"
                        color="primary"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Online Mode
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Tooltip title="Time remaining">
                            <Chip
                                icon={<TimerIcon />}
                                label={`${countdown} seconds`}
                                color="primary"
                                sx={{ fontSize: "1.1rem", py: 1 }}
                            />
                        </Tooltip>

                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<ExitToAppIcon />}
                            onClick={handleLeaveGame}
                            sx={{ borderRadius: 2 }}
                        >
                            Leave Game
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" fontWeight="500" sx={{ mb: 3 }}>
                        Players
                    </Typography>

                    <Grid2 container spacing={3}>
                        {[...Array(4)].map((_, i) => (
                            <Grid2 size={{ xs: 12, sm: 6 }} key={i}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        height: "100%",
                                        position: "relative",
                                        overflow: "hidden",
                                        borderLeft: room.players[i]?.username
                                            ? "4px solid #3f51b5"
                                            : "4px solid #e0e0e0",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: room.players[i]?.username
                                                ? "primary.main"
                                                : "grey.300",
                                        }}
                                    >
                                        {room.players[i]?.username ? (
                                            room.players[
                                                i
                                            ].username[0].toUpperCase()
                                        ) : (
                                            <PersonIcon />
                                        )}
                                    </Avatar>

                                    <Box sx={{ flex: 1 }}>
                                        {!room.players[i]?.username ? (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Skeleton
                                                    variant="text"
                                                    width="70%"
                                                />
                                                <CircularProgress size={18} />
                                            </Box>
                                        ) : (
                                            <Typography
                                                variant="h6"
                                                fontWeight="500"
                                            >
                                                {room.players[i].username}
                                            </Typography>
                                        )}

                                        {room.players[i]?.percentage !==
                                            undefined && (
                                            <Box sx={{ mt: 1, width: "100%" }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={
                                                        room.players[i]
                                                            .percentage
                                                    }
                                                    sx={{
                                                        height: 8,
                                                        borderRadius: 4,
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        mt: 0.5,
                                                        display: "block",
                                                    }}
                                                >
                                                    {room.players[i].percentage}
                                                    % Complete
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>

                                    {room.players[i]?.username && (
                                        <Tooltip title="Player Status">
                                            <Chip
                                                size="small"
                                                label="Active"
                                                color="success"
                                                sx={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 10,
                                                }}
                                            />
                                        </Tooltip>
                                    )}
                                </Paper>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Paper>
        </Box>
    );
};

export default OnlinePage;
