import { useWorkspaceMode } from "@/hooks/useRouteMode";
import { useSocketStore } from "@/store/SocketStore";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid2,
    Paper,
    Stack,
    Typography,
} from "@mui/material"; // Import Table components
import grey from "@mui/material/colors/grey";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";
import ProblemDescription from "./ProblemDescription";
import Submissions from "./Submissions";

type ProblemDescriptionProps = {};

const ProblemPanel: React.FC<ProblemDescriptionProps> = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<"description" | "submissions">(
        "description"
    );
    const { isOnlineMode, isStandardMode } = useWorkspaceMode();
    const { room, handleLeaveGame, redirectToHome, resetRedirectToHome } =
        useSocketStore();
    const [playerProgressCache, setPlayerProgressCache] = useState<{
        [userId: number]: {
            username: string;
            percentage: number;
        };
    }>({});

    const allPlayerIds = useMemo(() => {
        return new Set([
            ...room.players.map((p) => p.userId),
            ...Object.keys(playerProgressCache).map((id) => Number(id)),
        ]);
    }, [room.players, playerProgressCache]);

    const allPlayers = useMemo(() => {
        return Array.from(allPlayerIds).map((userId) => {
            const livePlayer = room.players.find((p) => p.userId === userId);
            const cached = playerProgressCache[userId];

            return {
                userId,
                username: livePlayer?.username ?? cached?.username ?? "Unknown",
                percentage: livePlayer?.percentage ?? cached?.percentage ?? 0,
                isDisconnected: !livePlayer,
            };
        });
    }, [allPlayerIds, room.players, playerProgressCache]);

    useEffect(() => {
        if (redirectToHome) {
            navigate("/");
            resetRedirectToHome();
        }
    }, [redirectToHome]);

    useEffect(() => {
        const newCache = { ...playerProgressCache };

        room.players.forEach((player) => {
            const { userId, username, percentage } = player;

            const cached = newCache[userId];
            const shouldUpdate = !cached || cached.percentage < percentage;

            if (shouldUpdate) {
                newCache[userId] = {
                    username,
                    percentage,
                };
            }
        });

        setPlayerProgressCache(newCache);
    }, [room.players]);

    return (
        <WorkspaceBox className="h-[calc(97vh-64px)]">
            <WorkspaceBoxTopBar>
                <Button
                    color="inherit"
                    startIcon={<DescriptionIcon color="info" />}
                    size="small"
                    variant="text"
                    onClick={() => setActiveView("description")}
                    sx={{
                        opacity: activeView === "description" ? 1 : 0.5,
                    }}
                >
                    Description
                </Button>
                {isStandardMode && (
                    <Button
                        color="inherit"
                        startIcon={<HistoryIcon color="info" />}
                        size="small"
                        variant="text"
                        onClick={() => setActiveView("submissions")}
                        sx={{
                            opacity: activeView === "submissions" ? 1 : 0.5,
                        }}
                    >
                        Submissions
                    </Button>
                )}
            </WorkspaceBoxTopBar>

            <Box
                sx={{
                    overflow: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {activeView === "description" ? (
                    <ProblemDescription />
                ) : (
                    <Submissions />
                )}
            </Box>
            {isOnlineMode && (
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "background.paper",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 3,
                        }}
                    >
                        <Typography variant="h6" fontWeight="500">
                            Players Progress
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Chip
                                icon={<GroupIcon />}
                                label={
                                    <Typography
                                        variant="overline"
                                        fontWeight="bold"
                                    >
                                        {
                                            room.players.filter(
                                                (p) => p?.username
                                            ).length
                                        }{" "}
                                        Active
                                    </Typography>
                                }
                                size="medium"
                                color="primary"
                                variant="outlined"
                            />
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={handleLeaveGame}
                            >
                                Leave Game
                            </Button>
                        </Stack>
                    </Box>

                    <Grid2 container spacing={12} justifyContent="center">
                        {allPlayers.map((player) => (
                            <Grid2 key={player.userId}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        transition: "transform 0.2s ease",
                                        opacity: player.isDisconnected
                                            ? 0.5
                                            : 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                        sx={{ mb: 1 }}
                                    >
                                        {player.username}
                                    </Typography>

                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: 80,
                                            height: 80,
                                        }}
                                    >
                                        <CircularProgress
                                            variant="determinate"
                                            value={100}
                                            size={80}
                                            thickness={3}
                                            sx={[
                                                {
                                                    color: grey[200],
                                                    position: "absolute",
                                                },
                                                (theme) =>
                                                    theme.applyStyles("dark", {
                                                        color: grey[800],
                                                    }),
                                            ]}
                                        />
                                        <CircularProgress
                                            variant="determinate"
                                            value={player.percentage || 0}
                                            size={80}
                                            thickness={3}
                                            sx={{
                                                color:
                                                    player.percentage > 75
                                                        ? "success.main"
                                                        : player.percentage > 50
                                                        ? "warning.main"
                                                        : "error.main",
                                                position: "absolute",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                color={
                                                    player.percentage > 75
                                                        ? "success.main"
                                                        : player.percentage > 50
                                                        ? "warning.main"
                                                        : "error.main"
                                                }
                                            >
                                                {player.percentage || 0}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid2>
                        ))}
                    </Grid2>
                </Paper>
            )}
        </WorkspaceBox>
    );
};

export default ProblemPanel;
