// src/store/snackbarStore.ts
import { create } from "zustand";

interface SnackbarPosition {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
}

interface SnackbarState {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
    position: SnackbarPosition;
    showSnackbar: (
        message: string,
        severity?: SnackbarState["severity"],
        position?: SnackbarPosition
    ) => void;
    closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
    open: false,
    message: "",
    severity: "info",
    position: { vertical: "bottom", horizontal: "center" },
    showSnackbar: (
        message,
        severity = "info",
        position = { vertical: "bottom", horizontal: "center" }
    ) =>
        set({
            open: true,
            message,
            severity,
            position,
        }),
    closeSnackbar: () => set({ open: false }),
}));
