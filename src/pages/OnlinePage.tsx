import { useAuthStore } from "@/store/AuthStore";
import { useSocketStore } from "@/store/SocketStore";
import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnlinePage: React.FC = () => {
    const { isConnected, room, countdown, serverTime, redirectToHome, redirectToPlayOnline,
        connectSocket, handleLeaveGame, resetRedirectToHome, resetRedirectToPlayOnline } = useSocketStore();
    const { user } = useAuthStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const navigate = useNavigate();

    useEffect(() => {
        connectSocket(user?.userId || -1, user?.username || "null")
        return () => {
        };
    }, []);

    useEffect(() => {
        if (redirectToHome) {
            navigate("/")
            resetRedirectToHome();
        }

        if (redirectToPlayOnline) {
            navigate("/play-online")
            resetRedirectToPlayOnline();
        }
    
    }, [redirectToHome, redirectToPlayOnline]);

    return (
        <>
        {/* {test.players.length} */}
        { room.players.length }
        <Box sx={{ padding: { xs: 1, sm: 2, md: 3 }, width: "100%" }}>
            <Box sx={{ width: "100%" }}>
                <Typography 
                    variant={isMobile ? "body1" : "h5"} 
                    color="primary" 
                    textAlign="right"
                    sx={{ 
                        fontSize: { 
                            xs: '0.9rem', 
                            sm: '1.1rem', 
                            md: '1.5rem' 
                        },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {isConnected ? "🟢 Connected" : "🔴 Disconnected"} | {serverTime}
                </Typography>
                <Typography 
                    variant={isMobile ? "body1" : "h5"} 
                    color="primary" 
                    textAlign="right"
                    sx={{ 
                        fontSize: { 
                            xs: '0.9rem', 
                            sm: '1.1rem', 
                            md: '1.5rem' 
                        },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%'
                    }}
                >
                    {/* {isConnected ? "🟢 Connected" : "🔴 Disconnected"} | {message} */}
                    {isConnected ? "🟢 Connected" : "🔴 Disconnected"} | { JSON.stringify(room.players) }
                </Typography>
            </Box>
            
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ 
                    height: { xs: 'auto', sm: '80vh' },
                    marginTop: { xs: 4, sm: 0 },
                    padding: { xs: 1, sm: 2 }
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    sx={{ 
                        marginTop: { xs: 0, sm: -10, md: -25 },
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <Typography 
                        variant={isMobile ? "h4" : "h3"} 
                        color="primary"
                        sx={{ 
                            fontSize: { 
                                xs: '1.8rem', 
                                sm: '2.5rem', 
                                md: '3rem' 
                            }
                        }}
                    >
                        Online Mode
                    </Typography>
                    <Typography 
                        variant={isMobile ? "h5" : "h3"} 
                        color="primary" 
                        sx={{ 
                            fontSize: { 
                                xs: '1.5rem', 
                                sm: '2rem', 
                                md: '2.5rem' 
                            },
                            mt: 1
                        }}
                    >
                        Cool down {"-->"} {countdown} seconds
                    </Typography>
                    <Button 
                        color="error" 
                        variant="contained" 
                        size={isMobile ? "medium" : "large"} 
                        onClick={handleLeaveGame}
                        sx={{ mt: 2 }}
                    >
                        Leave Game
                    </Button>
                </Box>
                
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: { xs: 2, sm: 3, md: 5 },
                        mt: { xs: 4, sm: 6 }
                    }}
                >
                    {[...Array(4)].map((_, i) => {
                        return (
                            <Box 
                                key={i} 
                                sx={{ 
                                    textAlign: "center", 
                                    padding: { xs: 1, sm: 2, md: 3 },
                                    width: { xs: '40%', sm: 'auto' }
                                }}
                            >
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                                    alt="Player avatar"
                                    style={{ 
                                        width: isMobile ? 60 : isTablet ? 75 : 90,
                                        height: 'auto'
                                    }}
                                />
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                        {/* {test.players[i]?.username ? '' : <CircularProgress size={isMobile ? 16 : 20} />} */}
                                        {room.players[i]?.username ? '' : <CircularProgress size={isMobile ? 16 : 20} />}
                                        <Typography 
                                            variant={isMobile ? "body1" : "h6"} 
                                            color="primary"
                                            sx={{ 
                                                fontSize: { 
                                                    xs: '0.9rem', 
                                                    sm: '1.1rem', 
                                                    md: '1.25rem' 
                                                }
                                            }}
                                        >
                                            {/* {test.players[i]?.username || "Loading..."}  */}
                                            {room.players[i]?.username || "Loading..."} 
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default OnlinePage;
