import { createTheme, ThemeOptions } from "@mui/material";

const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: "#019699",
        },
        success: {
            main: "#2CBB5D",
        },
    },
    typography: {
        fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    overflow: "hidden",
                },
            },
        },
    },
});

export const createCustomTheme = (mode: "light" | "dark") =>
    createTheme(getDesignTokens(mode));
