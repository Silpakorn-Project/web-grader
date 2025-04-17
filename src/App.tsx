import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import GlobalCountdownWatcher from "./components/GlobalCountdownWatcher";
import GlobalSnackbar from "./components/GlobalSnackbar";
import { router } from "./rounter/rounter";
import { client } from "./services";
import { useAuthStore } from "./store/AuthStore";
import GlobalScrollbarStyles from "./styles/GlobalScrollbarStyles";
import { theme } from "./styles/theme";

const App: FC = () => {
    const { setCredential } = useAuthStore();

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
    });

    if (isLoading) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalScrollbarStyles />
            <GlobalSnackbar />
            <GlobalCountdownWatcher />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
