import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./rounter/rounter";
import { client } from "./services";
import { useAuthStore } from "./store/AuthStore";

type AppProps = {};

const App: FC<AppProps> = () => {
    const { token, setCredential } = useAuthStore();

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
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
