import { useAuthStore } from "@/store/AuthStore";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_APP_GAME_SERVER_URL || "http://localhost:5555";

const OnlinePage: React.FC = () => {
    const [serverTime, setServerTime] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const socketRef = useRef<Socket | null>(null);
    const { userId, username } = useAuthStore();

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
            <Typography variant="h5" color="primary" textAlign="right">
                {isConnected ? "🟢 Connected" : "🔴 Disconnected"} | {serverTime}
            </Typography>
            <Typography variant="h5" color="primary" textAlign="right">
                {isConnected ? "🟢 Connected" : "🔴 Disconnected"} | {message}
            </Typography>
            <CircularProgress />
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                height={"80vh"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    marginTop={-25}
                >
                    <Typography variant="h3" color="primary">
                        Online Mode
                    </Typography>
                    <Typography variant="h3" color="primary">
                        Cool down {"-->"} 5 minutes
                    </Typography>
                    <Button color="error" variant="contained" size="large" onClick={handleLeaveGame}>
                        Leave Game
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={5}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} style={{ textAlign: "center", padding: 15 }}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                                width={90}
                            />
                            <Typography variant="h6" color="primary">
                                waiting player
                            </Typography>
                        </div>
                    ))}
                </Box>
            </Box>
        </>
    );
};




export default OnlinePage;
