import { useSocketStore } from "@/store/SocketStore";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material"; // Import Table components
import React, { useState } from "react";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";
import ProblemDescription from "./ProblemDescription";
import Submissions from "./Submissions";

type ProblemDescriptionProps = {};

interface Player {
    name: string;
    percent: number;
};

const ProblemPanel: React.FC<ProblemDescriptionProps> = () => {
    const [activeView, setActiveView] = useState<"description" | "submissions">(
        "description"
    );

    const { room } = useSocketStore();
    // Mock player data
    const mockPlayers: Player[] = [
        {
            name: "Somchai",
            percent: 67
        },
        {
            name: "Nattaporn",
            percent: 82
        },
        {
            name: "Wichai",
            percent: 45
        },
        {
            name: "Siriporn",
            percent: 91
        }
    ];

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
                { !location.pathname.startsWith("/online/play/") && (
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
                ) }
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
            { location.pathname.startsWith("/online/play") && (
                <Box 
                sx={{
                    p: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper"
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Players Progress
                </Typography>
                <Stack direction="row" spacing={3} justifyContent="space-around">
                    {/* {mockPlayers.map((player, index) => ( */}
                    {room.players.map((player, index) => (
                        <Box 
                            key={index} 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center'
                            }}
                        >
                            <Avatar 
                                src="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg"
                                alt={player.username}
                                sx={{ width: 48, height: 48, mb: 1 }}
                            />
                            <Typography variant="body2" fontWeight="medium">
                                {player.username}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                color={mockPlayers[index].percent > 75 ? "success.main" : 
                                        mockPlayers[index].percent > 50 ? "warning.main" : "error.main"}
                            >
                                {player.percentage}%
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
            )}
        </WorkspaceBox>
    );
};

export default ProblemPanel;
