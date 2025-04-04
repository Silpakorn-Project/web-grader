import { useAuthStore } from "@/store/AuthStore";
import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_APP_GAME_SERVER_URL || "http://localhost:5555";

interface DetailRoomType {
    userId: string;
    username: string;
    socketId: string;
}
interface RoomType {
    players: DetailRoomType[];
    gameStarted: boolean;
}

const OnlinePage: React.FC = () => {
    const [serverTime, setServerTime] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const socketRef = useRef<Socket | null>(null);
    const { userId, username } = useAuthStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [test, setTest] = useState<RoomType>({players: [], gameStarted: false});
    const [countdown , setCountdown] = useState<number>(10);
    
    const navigate = useNavigate();

    const connectSocket = () => {
        if (socketRef.current) return; // ถ้ามี socket อยู่แล้ว ไม่ต้องสร้างใหม่

        console.log("🔌 Connecting to socket...");
        const socket = io(SERVER_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });
        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.emit("joinRoom", { userId, username });

        socket.on("server time", (time) => {
            setServerTime(new Date(time).toLocaleTimeString());
        });

        socket.on("roomUpdate", (room) => {
            console.log(`Room updated: ${JSON.stringify(room)}`);
            setMessage(`Room updated: ${JSON.stringify(room)}`);
            

            console.log(room.players[0].username);
             
            
            setTest(room);
        });

        socket.on("countdown", (countdown) => {
            console.log(`Game starts in: ${countdown} seconds`);
            setCountdown(countdown);
        });

        socket.on("gameStart", () => {
            console.log("Redirecting to game page...");
            navigate("/") // เปลี่ยนไปหน้าสำหรับเล่นเกม
        });

        socket.on("reconnect_attempt", () => {
            console.log("Trying to reconnect...");
        });

        socket.on("reconnect", (attempt) => {
            console.log(`Reconnected on attempt ${attempt}`);
            setIsConnected(true);
        });
        
        socket.on("reconnect_failed", () => {
            console.log("Reconnect failed.");
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from server");
            setIsConnected(false);
        });

        // กรณีที่ถูกเตะออกจากห้อง ตอน tab 2 join มา
        socket.on("forceDisconnect", (reason: string) => {
            console.log("⚠️ ถูกเตะออกจากห้อง: ", reason);
            alert(reason);
            disconnectSocket();
            navigate("/"); 
        });
    };

    const disconnectSocket = () => {
        if (socketRef.current) {
            console.log("❌ Disconnecting socket...");
            socketRef.current.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        }
    };

    const handleLeaveGame = () => {
        disconnectSocket();
        navigate("/");
    };

    useEffect(() => {
        connectSocket();

        return () => {
            disconnectSocket();
        };
    }, []);

    return (
        <>
        {test.players.length}
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
                    {isConnected ? "🟢 Connected" : "🔴 Disconnected"} | {message}
                </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                {/* <CircularProgress /> */}
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
                                        {test.players[i]?.username ? '' : <CircularProgress size={isMobile ? 16 : 20} />}
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
                                            {test.players[i]?.username || "Loading..."} 
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
