import { create } from "zustand";

interface AuthState {
    token: string | null;
    username: string | null;
    userId: number | null;
    setCredential: (credentials: {
        token: string;
        username: string;
        userId: number;
    }) => void;
    clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    username: null,
    userId: null,
    setCredential: (credentials) => set({ ...credentials }),
    clearCredentials: () => set({ token: null, username: null, userId: null }),
}));
