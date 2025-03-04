import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { queryClient } from "./services/query/queryClient";
import "./styles/global.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#019699",
            light: "#33ABAD",
            dark: "#00696B",
            contrastText: "#ffffff",
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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
