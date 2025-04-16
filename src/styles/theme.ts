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
                    paper: "#292928 ",
                },
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
                background: {
                    default: "#fefffe",
                    paper: "#f7f9fb",
                },
            },
        },
    },
    typography: {
        fontFamily: [
            "Inter",
            "Noto Sans Thai",
            "SF Pro Display",
            "ui-sans-serif",
            "system-ui",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ].join(","),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    overflow: "hidden",
                    ...(ownerState.color === "success" &&
                        ownerState.variant === "contained" && {
                            color: "#ffffff",
                        }),
                }),
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                slotProps: {
                    paper: {
                        elevation: 6,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === "success" &&
                        ownerState.variant !== "outlined" && {
                            color: "#ffffff",
                        }),
                }),
            },
        },
    },
});
