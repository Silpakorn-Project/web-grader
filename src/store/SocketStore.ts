// import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

const SERVER_URL = import.meta.env.VITE_APP_GAME_SERVER_URL || "http://localhost:5555";

interface IPlayerDetails {
    userId: number;
    username: string;
    socketId: string;
    percentage: number;
}

interface IRoomDetails {
    roomKey: string;
    players: IPlayerDetails[];
    gameStarted: boolean;
    problems: number | null;
}

interface IUserPercentage {
    roomKey: string;
    userId: number;
    percentage: number;
}

interface SocketStore {
    socket: Socket | null;
    isConnected: boolean;
    room: IRoomDetails;
    countdown: number;
    serverTime: string | null;
    redirectToHome: boolean;
    redirectToPlayOnline: boolean;
    connectSocket: (userId: number, username: string) => void;
    getRoomKey: () => string; 
    disconnectSocket: () => void;
    handleLeaveGame: () => void;
    updatePercentage: (userPercentage: IUserPercentage) => void;
    resetRedirectToHome: () => void;
    resetRedirectToPlayOnline: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket: null,
    isConnected: false,
    room: { roomKey: "", players: [], gameStarted: false, problems: null },
    countdown: 10,
    serverTime: null,
    redirectToHome: false,
    redirectToPlayOnline: false,

    connectSocket: (userId, username) => {
        if (get().socket) return;

        const socket = io(SERVER_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        set({ socket });

        socket.on("connect", () => {
            set({ isConnected: true });
            socket.emit("joinRoom", { userId, username });
        });

        socket.on("server time", (time) => {
            set({serverTime: new Date(time).toLocaleTimeString()})
        });

        socket.on("roomUpdate", (room: IRoomDetails) => {
            set({ room });
        });

        socket.on("receivedPercentageUpdatePlayer", (players: IPlayerDetails[]) => {
            set((state) => {
                const updatedPlayers = state.room.players.map(player => {
                    const updatedPlayer = players.find(p => p.userId === player.userId);
                    if (updatedPlayer) {
                        return { ...player, percentage: updatedPlayer.percentage };
                    }
                    return player;
                });
        
                return { room: { ...state.room, players: updatedPlayers } };
            });

            console.log("percentupdate" + players);
        });

        socket.on("countdown", (count: number) => {
            set({ countdown: count });
        });

        socket.on("gameStart", () => {
            // ให้ไป redirect หน้าอื่นจาก component ที่ใช้งาน
            console.log("✅ Game started!");
            set({redirectToPlayOnline: true})
        });

        socket.on("disconnect", () => {
            set({ isConnected: false, socket: null });
        });

        socket.on("forceDisconnect", (reason: string) => {
            alert(reason);
            get().disconnectSocket();
            set({ redirectToHome: true })
        });
    },
    
    getRoomKey: () => {
        const room = get().room;
        return room.roomKey; // ถ้ามี roomKey ใน room
    },

    updatePercentage: (user: IUserPercentage) => {
        const socket = get().socket;
        if (socket) {
            socket.emit("updatePercentage", (user));
        }
    },

    resetRedirectToHome: () => {
        set({redirectToHome: false})
    },

    resetRedirectToPlayOnline: () => {
        set({redirectToPlayOnline: false})
    },

    handleLeaveGame: () => {
        get().disconnectSocket();
        set({ redirectToHome: true })
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
        }
        set({ socket: null, isConnected: false });
    },
}));
