import { create } from "zustand";

interface IUserStore {
    token: string;
    username: string;
    userId: number;
    email: string;
    role: string;
}

interface AuthState {
    user: IUserStore | null;
    setCredential: (credentials: IUserStore) => void;
    clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setCredential: (credentials) => set({ user: credentials }),
    clearCredentials: () => set({ user: null }),
}));
