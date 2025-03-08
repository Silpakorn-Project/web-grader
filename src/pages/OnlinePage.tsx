import router from "@/rounter/rounter";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:8000";

const OnlinePage: React.FC = () => {
    const [serverTime, setServerTime] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const socketRef = useRef<Socket | null>(null);

    const connectSocket = () => {
        if (socketRef.current) return; // ถ้ามี socket อยู่แล้ว ไม่ต้องสร้างใหม่

        console.log("🔌 Connecting to socket...");
        const socket = io(SERVER_URL);
        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.emit("joinRoom");

        socket.on("server time", (time) => {
            setServerTime(new Date(time).toLocaleTimeString());
        });

        socket.on("roomUpdate", (room) => {
            console.log(`Room updated: ${JSON.stringify(room)}`);
            setMessage(`Room updated: ${JSON.stringify(room)}`);
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
        router.navigate("/");
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            disconnectSocket();
        } else {
            connectSocket();
        }
    };

    useEffect(() => {
        connectSocket();
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            disconnectSocket();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
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
                height={"100vh"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 15,
                        alignItems: "center",
                    }}
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
                </div>
            </Box>
        </>
    );
};




export default OnlinePage;
