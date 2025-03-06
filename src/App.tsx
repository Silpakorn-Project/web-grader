import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./rounter/rounter";
import { client } from "./services";
import { useAuthStore } from "./store/AuthStore";
import { useThemeStore } from "./store/ThemeStore";
import GlobalScrollbarStyles from "./styles/GlobalScrollbarStyles";
import { createCustomTheme } from "./styles/theme";

type AppProps = {};

const App: FC<AppProps> = () => {
    const { token, setCredential } = useAuthStore();
    const { mode } = useThemeStore();
    const theme = createCustomTheme(mode);

    const { isLoading } = useQuery({
        queryKey: ["auth-check"],
        queryFn: async () => {
            const response =
                await client.graderService.authentication.refreshToken();

            if (response?.data?.token) {
                setCredential(response.data);
            }

            return response;
        },
        enabled: !token,
    });

    if (isLoading) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalScrollbarStyles />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
