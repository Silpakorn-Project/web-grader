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
    isAdmin: boolean;
    setCredential: (credentials: IUserStore) => void;
    clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAdmin: false,
    setCredential: (credentials) =>
        set({
            user: credentials,
            isAdmin: credentials.role === "ADMIN",
        }),
    clearCredentials: () => set({ user: null, isAdmin: false }),
}));
