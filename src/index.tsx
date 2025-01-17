import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

// TEMP: Fix resize observer
const OriginalResizeObserver = window.ResizeObserver;

window.ResizeObserver = function (callback: ResizeObserverCallback) {
    const wrappedCallback = (entries, observer) => {
        window.requestAnimationFrame(() => {
            callback(entries, observer);
        });
    };

    return new OriginalResizeObserver(wrappedCallback);
} as unknown as typeof ResizeObserver;

for (let staticMethod in OriginalResizeObserver) {
    if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
        window.ResizeObserver[staticMethod] =
            OriginalResizeObserver[staticMethod];
    }
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, 
        "Open Sans", "Helvetica Neue", sans-serif`,
    },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
