import { Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';


const OnlinePage: React.FC = () => {

    const [serverTime, setServerTime] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const didMount = useRef(false); // 🔹 ใช้ useRef เพื่อเช็คว่าเคยรันหรือยัง

    useEffect(() => {
        if (didMount.current) return; // ถ้าเคยรันแล้วให้ return ออกไปเลย
        didMount.current = true; // กำหนดให้มันรันแค่ครั้งแรก

        const socket: Socket = io("http://localhost:3000");

        socket.emit("joinRoom");

        socket.on("server time", (time) => {
            setServerTime(new Date(time).toLocaleTimeString());
        });

        socket.on("roomUpdate", (room) => {
            console.log(`Room updated: ${JSON.stringify(room)}`);
            setMessage(`Room updated: ${JSON.stringify(room)}`);
        });

        return () => {
            socket.off("server time");
        };
    }, []);

    return (
        <>
            { message }
            <Typography variant='h5' color='primary' textAlign={'right'}>{serverTime}</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', marginTop: -25 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h3" color="primary">
                        Online Mode
                    </Typography>
                    <Button color='error' variant="contained" size='large'>Leave Game</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 15, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <Typography variant='h6' color='primary'>waiting player</Typography>
                    </div>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <Typography variant='h6' color='primary'>waiting player</Typography>
                    </div>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <Typography variant='h6' color='primary'>waiting player</Typography>
                    </div>
                    <div style={{ textAlign: 'center', border: 1, padding: 15 }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" width={90} />
                        <Typography variant='h6' color='primary'>waiting player</Typography>
                    </div>
                </div>
            </div>

        </>
    );
};

export default OnlinePage;