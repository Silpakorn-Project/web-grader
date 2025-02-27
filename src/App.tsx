import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./rounter/rounter";
import { client } from "./services";
import { useAuthStore } from "./store/AuthStore";

type AppProps = {};

const App: FC<AppProps> = () => {
    const { token, setToken } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ["auth-check"],
        queryFn: async () => {
            const newToken =
                await client.graderService.authentication.refreshToken();

            if (newToken?.data?.token) {
                setToken(newToken.data.token);
            }

            return newToken;
        },
        enabled: !token,
    });

    if (isLoading) {
        return null;
    }

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
