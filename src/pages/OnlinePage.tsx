import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io("http://localhost:3000");

const OnlinePage: React.FC = () => {
    const [countdown, setCountdown] = useState<number>(30); // 30 seconds countdown

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    // Start the game or handle countdown end
                    console.log('Game starting...');
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [serverTime, setServerTime] = useState("");

    useEffect(() => {
        socket.on("server time", (time) => {
            setServerTime(new Date(time).toLocaleTimeString());
        });
        return () => {
            socket.off("server time");
        };
    }, []);

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" 
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={15} 
                >
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <h5>waiting player</h5>
                    </div>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <h5>waiting player</h5>
                    </div>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <h5>waiting player</h5>
                    </div>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <h5>waiting player</h5>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default OnlinePage;