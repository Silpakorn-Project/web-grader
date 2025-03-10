import { createTheme } from "@mui/material";

export const theme = createTheme({
    colorSchemes: {
        dark: {
            palette: {
                primary: {
                    main: "#019699",
                },
                success: {
                    main: "#2CBB5D",
                },
                background: {
                    default: "#1B1A1B",
                }
            },
        },
        light: {
            palette: {
                primary: {
                    main: "#019699",
                },
                success: {
                    main: "#2CBB5D",
                },
            },
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
