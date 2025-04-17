import { useSocketStore } from "@/store/SocketStore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
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
    Typography
} from "@mui/material";
import { FC } from "react";

type SummaryPageProps = {};

const SummaryPage: FC<SummaryPageProps> = () => {
    const { isConnected, room, serverTime, handleLeaveGame } = useSocketStore();

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

            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography
                        variant="h3"
                        color="primary"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Game Summary
                    </Typography>

                    <Button
                        color="error"
                        variant="contained"
                        startIcon={<ExitToAppIcon />}
                        onClick={handleLeaveGame}
                        sx={{ borderRadius: 2 }}
                    >
                        Leave Room
                    </Button>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" fontWeight="500" sx={{ mb: 3 }}>
                        Players
                    </Typography>

                    <Grid2 container spacing={3}>
                        {room.players.map((player, i) => (
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
                                        borderLeft: player.username
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
                                            bgcolor: player.username
                                                ? "primary.main"
                                                : "grey.300",
                                        }}
                                    >
                                        {player.username ? (
                                            player.username[0].toUpperCase()
                                        ) : (
                                            <PersonIcon />
                                        )}
                                    </Avatar>

                                    <Box sx={{ flex: 1 }}>
                                        {!player.username ? (
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
                                                {player.username}
                                            </Typography>
                                        )}

                                        {player.percentage !== undefined && (
                                            <Box sx={{ mt: 1, width: "100%" }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={player.percentage}
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
                                                    {player.percentage}%
                                                    Complete
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Paper>
        </Box>
    );
};

export default SummaryPage;
